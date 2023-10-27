import { OrderItem } from "@prisma/client";
export declare class OrderCreateDTO {
    userId: string;
    orderItems: Pick<OrderItem, "productId" | "quantity" | "totalPrice" | "size">[];
}
export declare class OrderItemsCreateDTO {
    orderItems: Pick<OrderItem, "productId" | "quantity" | "totalPrice" | "size">[];
}
