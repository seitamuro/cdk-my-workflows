import { AuthContext } from '@/hooks/useMyAuth';
import {
  AuthSession,
  fetchAuthSession,
  getCurrentUser,
  GetCurrentUserOutput,
} from "@aws-amplify/auth";
import { ReactNode, useEffect, useState } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<GetCurrentUserOutput | null>(null);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);

  const fetchAuthData = async () => {
    try {
      const sessionData = await fetchAuthSession();
      setAuthSession(sessionData);
      if (sessionData.tokens?.idToken) {
        setAuthorization(sessionData.tokens?.idToken?.toString());
      }

      const userData = await getCurrentUser();
      setCurrentUser(userData);
      setUserId(userData?.userId || null);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setUserId(null);
      setCurrentUser(null);
      setAuthSession(null);
      setAuthorization(null);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  const value = {
    isAuthenticated,
    userId,
    authorization,
    currentUser,
    authSession,
    refetch: fetchAuthData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
