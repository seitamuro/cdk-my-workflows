import { signOut } from "aws-amplify/auth";

export const SignOutWithGoogleButton: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return <button onClick={handleSignOut}>Sign out with Google</button>;
};
