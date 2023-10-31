export interface AdminOrder {
  id: string;
  userId: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  orderItems: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
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
