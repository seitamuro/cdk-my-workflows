import * as Auth from "@aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyAuth } from "../../hooks/useMyAuth";

// AWS設定の初期化
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID || "",
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || "",
    }
  }
});

type Props = {
  username: string;
  password: string;
};

export const SignInButton: React.FC<Props> = ({ username, password }) => {
  const navigate = useNavigate();
  const { refetch } = useMyAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await Auth.signIn({
        username,
        password,
      });
      console.log(data);

      // 認証状態を更新
      await refetch();

      // 少し待ってから遷移
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button disabled={isLoading} onClick={handleSignIn}>
        {isLoading ? "サインイン中..." : "サインイン"}
      </button>
    </div>
  );
};
