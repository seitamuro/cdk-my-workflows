import * as Auth from '@aws-amplify/auth';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const ConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username') || '';
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();

  const handleConfirmSignUp = async () => {
    if (isLoading) return;

    if (setError) {
      if (confirmationCode.length === 0) {
        setError('確認コードを入力してください。');
        return;
      }
    }

    try {
      setIsLoading(true);
      await Auth.confirmSignUp({
        username: username,
        confirmationCode: confirmationCode,
      });
      setSuccess('確認が完了しました。5秒後にHomeページへ遷移します。');

      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (err) {
      if (setError) {
        setError('確認コードが正しくありません。');
      }
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUpCode({
        username,
      });
      if (setSuccess) {
        setSuccess('確認コードを再送信しました。');
      }
    } catch (err) {
      if (setError) {
        setError('確認コードの再送信に失敗しました。');
      }
      console.error(err);
    }
  };

  return (
    <div>
      <h1>アカウント確認</h1>
      {username ? (
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

          <button onClick={handleConfirmSignUp} disabled={isLoading}>
            確認
          </button>
          <button onClick={handleResendCode} disabled={isLoading}>
            確認コードを再送信
          </button>
        </div>
      ) : (
        <p>
          usernameが指定されていません。<Link to="/signup">サインアップ</Link>からやり直してください
        </p>
      )}
    </div>
  );
};
