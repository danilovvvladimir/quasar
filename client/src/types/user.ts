import { Order } from "./order";
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

export interface User {
  id: string;
  username: string;
  email: string;
  role: RoleName;

  orders: Order[];
  reviews: Review[];
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];

  updatedAt: Date;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  size: number;
  quantity: number;
  userId: string;
  productId: string;
}

export interface CartItemCreate extends Omit<CartItem, "id"> {}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
}

export interface UserUpdateDTO {
  email: string;
  username: string;
  password?: string;
}
