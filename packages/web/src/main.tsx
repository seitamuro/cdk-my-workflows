import { Amplify } from "aws-amplify";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
      loginWith: {
        oauth: {
          domain: "my-workflows-seimiura.auth.us-east-1.amazoncognito.com",
          scopes: ['openid', 'email', 'profile'],
          // redirect urlはauth-stack.tsとgoogle認証で設定したものにする必要がある
          redirectSignIn: ['http://localhost:5173'],
          redirectSignOut: ['http://localhost:5173'],
          responseType: 'code',
          providers: [
            "Google"
          ],
        }
      }
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
)
