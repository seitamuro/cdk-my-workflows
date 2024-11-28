export const SignOutWithGoogleButton: React.FC = () => {
  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_USER_POOL_CLIENT_ID
    const logoutUri = "";
    const cognitoDomain = "https://my-workflows-seimiura.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&redirect_uri=${encodeURIComponent("http://localhost:5173")}`;
  };
  return <button onClick={signOutRedirect}>Sign out with Google</button>;
}