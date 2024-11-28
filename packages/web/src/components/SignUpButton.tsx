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

type Props = {
  username: string;
  password: string;
}

export const SignUpButton: React.FC<Props> = ({ username, password }) => {
  const handleSignUp = () => {

    // Cognitoでユーザー登録
    Auth.signUp({
      username,
      password,
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.error(err);
    })
  };

  return (
    <div>
      <button onClick={handleSignUp}>サインアップ</button>
    </div>
  );
};
