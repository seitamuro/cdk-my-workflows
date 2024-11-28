export const SignOutWithGoogleButton: React.FC = () => {
  const signOutRedirect = () => {
    const clientId = "2f9entij9fi9fvbfhf8hlvm3c5";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://my-workflows-seimiura.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&redirect_uri=${encodeURIComponent("http://localhost:5173")}`;
  };
  return <button onClick={signOutRedirect}>Sign out with Google</button>;
}