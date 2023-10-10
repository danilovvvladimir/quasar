export enum LoadingStatus {
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface IAuthInitialState {
  loading: LoadingStatus | null;
  tokens: ITokens | null;
  user: any | null;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
