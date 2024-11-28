import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export const useMyAuth = () => {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string | null>(null);

  useEffect(() => {
    if (auth) {
      setIsAuthenticated(auth.isAuthenticated);
      setUserId(auth.user?.profile.sub || null);
      setAuthorization(auth.user?.id_token || null);
    }

    getCurrentUser().then((data) => {
      console.log(data);
      setIsAuthenticated(true);
      setUserId(data?.userId || null);
    });

    fetchAuthSession().then((data) => {
      console.log(data);
      setAuthorization(data.tokens?.idToken?.toString() || null);
    });
  }, [auth]);

  return {
    isAuthenticated,
    userId,
    authorization,
  };
};
