import { useState } from "react";
import { ConfirmSignUp } from "../components/auth/ConfirmSignUp";
import { SignUpButton } from "../components/auth/SignUpButton";
import { SignUpWithGoogleButton } from "../components/auth/SignUpWithGoogleButton";

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div>
        username: <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div>
        password: <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <SignUpButton username={username} password={password} />
      <SignUpWithGoogleButton />
      <ConfirmSignUp username={username} />
    </>
  )
}
