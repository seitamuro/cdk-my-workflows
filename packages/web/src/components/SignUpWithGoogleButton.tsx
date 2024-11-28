import { useAuth } from "react-oidc-context";

export const SignUpWithGoogleButton = () => {
  const auth = useAuth();

  return (
    <button onClick={() => auth.signinRedirect()}>Sign in with Google</button>
  );
};