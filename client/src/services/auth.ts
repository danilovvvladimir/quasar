import defaultAxios from "axios";
import updatedAxios from "@/axios";
import Cookies from "js-cookie";
import { ITokens } from "@/types/common";
import { IAuthResponse } from "@/types/auth";
import { API_URL } from "@/constants/api";
import {
  COOKIES_REFRESH_TOKEN_KEY,
  LOCALSTORAGE_ACCESS_TOKEN_KEY,
} from "@/constants/localStorage";

export const saveTokensStorage = (data: ITokens) => {
  localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, data.accessToken);
  Cookies.set(COOKIES_REFRESH_TOKEN_KEY, data.refreshToken);
};

export const removeTokensStorage = () => {
  localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
  Cookies.remove(COOKIES_REFRESH_TOKEN_KEY);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data.tokens);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const AuthService = {
  async register(username: string, email: string, password: string) {
    const response = await updatedAxios.post<IAuthResponse>(
      `${API_URL}/auth/register`,
      {
        username,
        email,
        password,
      },
    );

    if (response.data.tokens.accessToken && response.data.tokens.refreshToken) {
      saveToStorage(response.data);
    }

    return response;
  },

  async login(email: string, password: string) {
    const response = await updatedAxios.post<IAuthResponse>(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
    );

    if (response.data.tokens.accessToken && response.data.tokens.refreshToken) {
      saveToStorage(response.data);
    }

    return response;
  },

  async logout() {
    removeTokensStorage();
    localStorage.removeItem("user");
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(COOKIES_REFRESH_TOKEN_KEY);

    const response = await defaultAxios.post<IAuthResponse>(
      `${API_URL}/auth/refresh`,
      { refreshToken },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (response.data.tokens.accessToken && response.data.tokens.refreshToken) {
      saveToStorage(response.data);
    }

    return response;
  },
};
