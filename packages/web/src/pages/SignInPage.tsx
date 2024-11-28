import { useState } from "react";
import { SignInButton } from "../components/SignInButton";
import { SignUpWithGoogleButton } from "../components/SignUpWithGoogleButton";

export const SignInPage = () => {
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
      <SignInButton username={username} password={password} />
      <SignUpWithGoogleButton />
    </>
  )
}
