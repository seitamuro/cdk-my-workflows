import { signInWithRedirect } from 'aws-amplify/auth';

export const SignUpWithGoogleButton: React.FC = () => {
  const handleSignIn = async () => {
    try {
      await signInWithRedirect({
        provider: 'Google',
      });
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};
