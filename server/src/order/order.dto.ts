import { OrderItem } from "@prisma/client";
import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
} from "class-validator";

export class OrderCreateDTO {
  @IsString()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderItems: Pick<OrderItem, "productId" | "quantity" | "totalPrice">[];
}

export class OrderItemsCreateDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  orderItems: Pick<OrderItem, "productId" | "quantity" | "totalPrice">[];
}
