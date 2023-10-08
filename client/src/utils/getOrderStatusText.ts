import { OrderStatus } from "@/types/order";

export const getOrderStatusText = (orderStatus: OrderStatus): string => {
  switch (orderStatus) {
    case OrderStatus.DELIVERED:
      return "Доставлен";
    case OrderStatus.PROCESSING:
      return "В пути";
    case OrderStatus.PENDING:
      return "В обработке";

    default:
      throw new Error("Unknown OrderStatus");
  }
};
