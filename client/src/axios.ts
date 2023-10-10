import axios from "axios";
import { API_URL } from "./constants/api";
import { IAuthResponse } from "./types/auth";
import Cookies from "js-cookie";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
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
        const response = await axios.get<IAuthResponse>(
          `${API_URL}/auth/refresh`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("refreshToken")}`,
            },
          },
        );

        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
        console.log(e);
      }
    }
    throw error;
  },
);

export default instance;
