import { User } from "./user";

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

export interface IReviewRequest {
  text: string;
  rating: number;
  userId: string;
  productId: string;
}

export interface ReviewUpdateRequest {
  text: string;
  rating: number;
}

export interface IReviewCreateFields {
  text: string;
  rating: number;
}

export interface IAuthInitialState {
  loading: LoadingStatus | null;
  tokens: ITokens | null;
  user: User | null;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
