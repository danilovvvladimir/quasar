import { Product } from "./product";
import { Review } from "./review";

export enum RoleName {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export interface UserPublic {
  id: string;
  username: string;
}
