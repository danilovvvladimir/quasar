import { AuthService } from "@/services/auth";
import { IAuthResponse } from "@/types/auth";
import { ILoginRequest, IRegisterRequest } from "@/types/common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<IAuthResponse, IRegisterRequest>(
  "auth/register",
  async ({ username, email, password }, thunkApi) => {
    try {
      const response = await AuthService.register(username, email, password);

      console.log("register response", response);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk<IAuthResponse, ILoginRequest>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password);

      console.log("login response", response);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", () => {
  AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      console.log("start");

      const response = await AuthService.getNewTokens();
      console.log("checkAuth response", response);
      return response.data;
    } catch (error) {
      // thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error);
    }
  },
);
