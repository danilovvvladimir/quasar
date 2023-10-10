import { Order } from "./order";
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
  role: RoleName;
}

export interface UserPrivate {
  id: string;
  username: string;
  email: string;
  role: RoleName;
  ordersCount: number;
  reviewsCount: number;
  updatedAt: Date;
  createdAt: Date;
}
