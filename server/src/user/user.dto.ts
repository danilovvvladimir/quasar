import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserUpdateDTO {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone: string;
}

export class CartItemCreateDTO {
  @IsNumber()
  size: number;

  // @IsNumber()
  // quantity: number;
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}

export class WishlistItemToggleDTO {
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}
