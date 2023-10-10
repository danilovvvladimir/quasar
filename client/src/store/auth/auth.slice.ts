import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, logoutUser, registerUser } from "./auth.actions";
import { IAuthInitialState, LoadingStatus } from "@/types/common";
import { RootState } from "../store";

const initialState: IAuthInitialState = {
  loading: null,
  tokens: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = LoadingStatus.SUCCESS;
      state.tokens = {
        accessToken: payload.tokens.accessToken,
        refreshToken: payload.tokens.refreshToken,
      };
      state.user = payload.user;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = LoadingStatus.FAILURE;
      state.tokens = null;
      state.user = null;
    });
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = LoadingStatus.SUCCESS;
      state.tokens = {
        accessToken: payload.tokens.accessToken,
        refreshToken: payload.tokens.refreshToken,
      };
      state.user = payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = LoadingStatus.FAILURE;
      state.tokens = null;
      state.user = null;
    });
    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = initialState.loading;
      state.tokens = initialState.tokens;
      state.user = initialState.user;
    });
    // CheckAuth
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = LoadingStatus.LOADING;
    });
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.loading = LoadingStatus.SUCCESS;
      state.tokens = payload.tokens;
      state.user = payload.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = LoadingStatus.FAILURE;
      state.tokens = null;
      state.user = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const checkIsAuth = (state: RootState) => Boolean(state.auth.user);
