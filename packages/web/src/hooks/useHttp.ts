import { fetchAuthSession } from "@aws-amplify/auth";
import axios from "axios";
import {} from "react-oidc-context";
import useSWR, { SWRConfiguration } from "swr";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

api.interceptors.request.use(async (config) => {
  const token = (await fetchAuthSession()).tokens?.idToken?.toString();

  if (token) {
    config.headers.Authorization = token;
  } else {
    const value = sessionStorage.getItem(
      `oidc.user:https://cognito-idp.us-east-1.amazonaws.com/${
        import.meta.env.VITE_USER_POOL_ID
      }:${import.meta.env.VITE_USER_POOL_CLIENT_ID}`
    );
    if (value) {
      config.headers.Authorization = JSON.parse(value).id_token;
    }
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

const fetcher = (url: string) => {
  return api.get(url).then((res) => res.data);
};

export const useHttp = () => {
  return {
    api,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: <Data = any, Error = any>(
      url: string | null,
      config?: SWRConfiguration
    ) => {
      // eslint-disable-next-line
      return useSWR<Data, Error>(url, fetcher, config);
    },
  };
};
