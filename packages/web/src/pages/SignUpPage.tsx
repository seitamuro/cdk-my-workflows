import { SignUpButton } from "@/components/auth/SignUpButton";
import { SignUpWithGoogleButton } from "@/components/auth/SignUpWithGoogleButton";
import { useState } from "react";

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

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <div style={styles.errorMessage}>{errorMessage}</div>
      <div>
        username: <input onChange={(e) => setUsername(e.target.value)} type="text" />
      </div>
      <div>
        password: <input onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <SignUpButton username={username} password={password} setErrorMessage={setErrorMessage} />
      <SignUpWithGoogleButton />
    </>
  )
}
