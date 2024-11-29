import { useMyAuth } from '@/hooks/useMyAuth';
import * as Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CognitoPayload = {
  'cognito:identity_provider'?: string | string[];
};

type SignOutButtonProps = {
  provider?: 'default' | 'google';
  buttonText?: string;
};

export const SignOutButton: React.FC<SignOutButtonProps> = ({
  provider = 'default',
  buttonText,
}) => {
  const navigate = useNavigate();
  const { refetch, authSession, currentUser } = useMyAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Googleプロバイダの判定
  const isGoogleProvider = Array.isArray(
    (authSession?.tokens?.accessToken?.payload as CognitoPayload)?.['cognito:identity_provider']
  )
    ? (authSession?.tokens?.accessToken?.payload as CognitoPayload)?.[
        'cognito:identity_provider'
      ]?.includes('Google')
    : (authSession?.tokens?.accessToken?.payload as CognitoPayload)?.[
        'cognito:identity_provider'
      ] === 'Google' || currentUser?.username?.toString().includes('Google_');

  // プロバイダに基づいたボタンテキストの設定
  const buttonLabel =
    buttonText ||
    (provider === 'google' || isGoogleProvider ? 'Sign out with Google' : 'サインアウト');

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // プロバイダに応じたサインアウト処理
      if (provider === 'default' || !isGoogleProvider) {
        await Auth.signOut({
          global: true,
        });
      } else {
        await Auth.signOut({
          global: true,
        });
      }

      // 認証状態を更新
      await refetch();

      // 少し待ってから遷移
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 500);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <button disabled={isLoading} onClick={handleSignOut}>
      {isLoading ? 'サインアウト中...' : buttonLabel}
    </button>
  );
};
