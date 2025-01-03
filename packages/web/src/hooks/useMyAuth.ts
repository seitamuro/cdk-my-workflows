import { AuthSession, GetCurrentUserOutput } from '@aws-amplify/auth';
import { JwtPayload } from 'aws-jwt-verify/jwt-model';
import { createContext, useContext } from 'react';
export interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  authorization: string | null;
  currentUser: GetCurrentUserOutput | null;
  authSession: AuthSession | null;
  payload: JwtPayload | null;
  refetch: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useMyAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useMyAuth must be used within an AuthProvider');
  }
  return context;
};
