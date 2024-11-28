import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "react-oidc-context"
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_4XHM2tRMa",
  client_id: "48pqp6j6uvkuha14i96n9ng28m",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid profile",
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>,
)
