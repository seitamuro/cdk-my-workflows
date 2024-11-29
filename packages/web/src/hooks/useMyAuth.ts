import {
  AuthSession,
  fetchAuthSession,
  getCurrentUser,
  GetCurrentUserOutput,
} from "@aws-amplify/auth";
import { useEffect, useState } from "react";

export const useMyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<GetCurrentUserOutput | null>(
    null
  );
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => {
      setIsAuthenticated(true);
      setUserId(data?.userId || null);
      setCurrentUser(data);
    });

    fetchAuthSession().then((data) => {
      setAuthSession(data);
      if (data.tokens?.idToken) {
        setAuthorization(data.tokens?.idToken?.toString());
      }
    });
  }, []);

  return {
    isAuthenticated,
    userId,
    authorization,
    currentUser,
    authSession,
  };
};
