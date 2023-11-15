import axios from "axios";
import { API_URL } from "./constants/api";
import { IAuthResponse } from "./types/auth";
import Cookies from "js-cookie";
import {
  COOKIES_REFRESH_TOKEN_KEY,
  LOCALSTORAGE_ACCESS_TOKEN_KEY,
} from "./constants/localStorage";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = Cookies.get(COOKIES_REFRESH_TOKEN_KEY);

        const response = await axios.post<IAuthResponse>(
          `${API_URL}/auth/refresh`,
          { refreshToken },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        localStorage.setItem(
          LOCALSTORAGE_ACCESS_TOKEN_KEY,
          response.data.tokens.accessToken,
        );
        return instance.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  },
);

export default instance;
