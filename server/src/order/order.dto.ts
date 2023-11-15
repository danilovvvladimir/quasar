import { OrderItem, OrderStatus } from "@prisma/client";
import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsEnum,
} from "class-validator";

export class OrderCreateDTO {
  @IsString()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderItems: Pick<
    OrderItem,
    "productId" | "quantity" | "totalPrice" | "size"
  >[];
}

export class OrderItemsCreateDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderItems: Pick<
    OrderItem,
    "productId" | "quantity" | "totalPrice" | "size"
  >[];
}

export class UpdateStatusDTO {
  @IsString()
  id: string;

  @IsEnum(OrderStatus)
  newOrderStatus: OrderStatus;
}
