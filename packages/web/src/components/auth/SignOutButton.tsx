import * as Auth from "@aws-amplify/auth";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMyAuth } from "../../hooks/useMyAuth";

export const SignOutButton: React.FC = () => {
  const navigate = useNavigate();
  const { refetch } = useMyAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const data = await Auth.signOut({
        global: true,
        oauth: {
          redirectUrl: 'http://localhost:5173',
        }
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
      <button disabled={isLoading} onClick={handleSignOut}>
        {isLoading ? "サインアウト中..." : "サインアウト"}
      </button>
    </div>
  );
};
