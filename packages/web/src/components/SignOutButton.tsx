import * as Auth from "@aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import React from 'react';

// AWS設定の初期化
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID || "",
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || "",
    }
  }
});

export const SignOutButton: React.FC = () => {

  const handleSignOut = () => {
    // Cognitoでユーザー登録
    Auth.signOut({
      global: true,
      oauth: {
        redirectUrl: 'http://localhost:5173',
      }
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err);
    })
  };

  return (
    <div>
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
};
