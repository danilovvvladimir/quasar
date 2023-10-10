import defaultAxios from "axios";
import updatedAxios from "@/axios";
import Cookies from "js-cookie";
import { ITokens } from "@/types/common";
import { IAuthResponse } from "@/types/auth";
import { API_URL } from "@/constants/api";

export const saveTokensStorage = (data: ITokens) => {
  localStorage.setItem("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
};

export const removeTokensStorage = () => {
  localStorage.removeItem("accessToken");
  Cookies.remove("refreshToken");
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

    console.log("auth service register response", response);

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
    await updatedAxios.post(`${API_URL}/auth/logout`);

    removeTokensStorage();
    localStorage.removeItem("user");
  },

  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");

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
    console.log("getNewTokens response", response);

    if (response.data.tokens.accessToken && response.data.tokens.refreshToken) {
      saveToStorage(response.data);
    }

    return response;
  },
};
