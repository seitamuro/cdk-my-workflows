import { fetchAuthSession, getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";

export const useMyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorization, setAuthorization] = useState<string | null>(null);

  useEffect(() => {
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
  });

  return {
    isAuthenticated,
    userId,
    authorization,
  };
};
