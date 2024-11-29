import { useMyAuth } from "@/hooks/useMyAuth";
import * as Auth from "@aws-amplify/auth";
import React from 'react';
import { useNavigate } from "react-router-dom";

type Props = {
  username: string;
  password: string;
  setErrorMessage?: (message: string) => void;
}

export const SignUpButton: React.FC<Props> = ({ username, password, setErrorMessage }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { refetch } = useMyAuth();

  const handleSignUp = async () => {
    if (isLoading) return;

    if (setErrorMessage) {
      if (username.length === 0) {
        setErrorMessage("usernameを入力してください");
        return;
      }

      if (password.length === 0) {
        setErrorMessage("passwordを入力してください");
        return;
      }
    }

    setIsLoading(true);

    await Auth.signUp({
      username,
      password,
    }).then(async () => {
      await refetch();
      setIsLoading(false)
      navigate(`/confirm?username=${username}`);
    }).catch((err) => {
      console.error(err);
      if (setErrorMessage) {
        setErrorMessage("サインアップに失敗しました");
      }
      setIsLoading(false);
    })
  };

  return (
    <div>
      <button onClick={handleSignUp} disabled={isLoading}>サインアップ</button>
    </div>
  );
};
