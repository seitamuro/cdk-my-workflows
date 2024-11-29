import * as Auth from "@aws-amplify/auth";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyAuth } from "../../hooks/useMyAuth";

type Props = {
  username: string;
  password: string;
  setErrorMessage?: (message: string) => void;
};

export const SignInButton: React.FC<Props> = ({ username, password, setErrorMessage }) => {
  const navigate = useNavigate();
  const { refetch } = useMyAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
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
    if (isLoading) return;

    setIsLoading(true);
    try {
      await Auth.signIn({
        username,
        password,
      });

      // 認証状態を更新
      await refetch();

      // 少し待ってから遷移
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      if (setErrorMessage) {
        setErrorMessage("サインインに失敗しました");
      }
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
