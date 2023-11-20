import { Product } from "./product";

export interface AdminOrder extends Order {
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  size: number;
  quantity: number;
  totalPrice: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
}

export interface OrderCreateDTO {
  userId: string;
  orderItems: OrderItemCreateDTO[];
}

export interface OrderItemCreateDTO {
  productId: string;
  quantity: number;
  size: number;
  totalPrice: number;
}
