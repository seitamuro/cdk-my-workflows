import * as Auth from '@aws-amplify/auth';
import React, { useState } from 'react';

export const ConfirmSignUp: React.FC<{
  username: string;
}> = ({ username }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfirmSignUp = async () => {
    try {
      console.log(username, confirmationCode);
      await Auth.confirmSignUp({
        username: username,
        confirmationCode: confirmationCode,
      });
      setSuccess('アカウントが正常に確認されました。');
      // ログイン画面やホーム画面にリダイレクト
    } catch (err) {
      setError('確認コードが正しくありません。');
      console.error(err);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUpCode({
        username,
      });
      setSuccess('確認コードを再送信しました。');
    } catch (err) {
      setError('確認コードの再送信に失敗しました。');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>確認コード入力</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div>
        <label>確認コード:</label>
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="確認コードを入力"
          required
        />
      </div>

      <button onClick={handleConfirmSignUp}>確認</button>
      <button onClick={handleResendCode}>確認コードを再送信</button>
    </div>
  );
};
