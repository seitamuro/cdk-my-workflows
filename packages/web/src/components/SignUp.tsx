import * as Auth from "@aws-amplify/auth";
import { Amplify } from 'aws-amplify';
import React, { useState } from 'react';
import { ConfirmSignUp } from "./ConfirmSignUp";

// AWS設定の初期化
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID || "",
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || "",
    }
  }
});

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = () => {
    //e.preventDefault();
    //setError('');
    //setSuccess('');

    // Cognitoでユーザー登録
    Auth.signUp({
      username,
      password,
    }).then((data) => {
      console.log(data);
      setSuccess('サインアップが成功しました。確認コードを確認してください。');
    }).catch((err) => {
      console.error(err);
      setError('サインアップに失敗しました。');
    })
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <label>ユーザー名:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>メールアドレス:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button onClick={handleSignUp}>サインアップ</button>

      <ConfirmSignUp username={username} />
    </div>
  );
};
