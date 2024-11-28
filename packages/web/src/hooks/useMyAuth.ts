import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export const useMyAuth = () => {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string | null>(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log("auth", auth);
      setIsAuthenticated(auth.isAuthenticated);
      setUserId(auth.user?.profile.sub || null);
      if (auth.user?.id_token) {
        setAuthorization(auth.user?.id_token);
      }
    }

    getCurrentUser().then((data) => {
      console.log("getCurrentUser:", data);
      setIsAuthenticated(true);
      setUserId(data?.userId || null);
    });

    fetchAuthSession().then((data) => {
      console.log("fetchAuthSesson: ", data);
      if (data.tokens?.idToken) {
        setAuthorization(data.tokens?.idToken?.toString());
      }
    });
  }, [auth]);

  return {
    isAuthenticated,
    userId,
    authorization,
  };
};
