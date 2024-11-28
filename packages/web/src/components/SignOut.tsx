import * as Auth from "@aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import React, { useState } from 'react';

// AWS設定の初期化
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID || "",
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || "",
    }
  }
});

export const SignOut: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignOut = () => {
    // Cognitoでユーザー登録
    Auth.signOut({
      global: true,
      oauth: {
        redirectUrl: 'http://localhost:5173',
      }
    }).then((data) => {
      console.log(data);
      setSuccess('サインアウトに成功しました');
    }).catch((err) => {
      console.error(err);
      setError('サインアウトに失敗しました');
    })
  };

  return (
    <div>
      <h2>サインアウト</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
};
