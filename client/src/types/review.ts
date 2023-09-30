import { UserPublic } from "./user";

export interface Review {
  id: string;
  text: string;
  rating: number;
  user: UserPublic;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}
