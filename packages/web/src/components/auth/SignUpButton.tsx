import * as Auth from "@aws-amplify/auth";
import React from 'react';

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
