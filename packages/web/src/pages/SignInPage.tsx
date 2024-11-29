import { useState } from "react";
import { SignInButton } from "../components/auth/SignInButton";
import { SignUpWithGoogleButton } from "../components/auth/SignUpWithGoogleButton";

const styles = {
  errorMessage: {
    color: '#dc3545',
    marginBottom: '1rem',
    padding: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    minHeight: '1.5rem'
  }
};

export const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <h1>Sign In</h1>
      <div style={styles.errorMessage}>{errorMessage}</div>
      <div>
        username: <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div>
        password: <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <SignInButton username={username} password={password} setErrorMessage={setErrorMessage} />
      <SignUpWithGoogleButton />
    </>
  )
}
