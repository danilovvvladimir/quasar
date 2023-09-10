import { IsEmail, IsOptional, IsString } from "class-validator";

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
