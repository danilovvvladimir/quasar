import { OrderItem } from "@/types/order";

export const calculateOrderTotal = (orderItems: OrderItem[]) => {
  return orderItems.reduce((acc, current) => acc + current.totalPrice, 0);
};
