import { ITokens } from "./common";
import { User } from "./user";

export interface IAuthResponse {
  tokens: ITokens;
  user: User;
}
