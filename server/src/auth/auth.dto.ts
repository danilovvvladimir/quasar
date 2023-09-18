import { IsEmail, MinLength, IsString, MaxLength } from "class-validator";
import {
  REGISTER_PASSWORD_MAX_MESSAGE,
  REGISTER_PASSWORD_MIN_MESSAGE,
  REGISTER_USERNAME_MAX_MESSAGE,
  REGISTER_USERNAME_MIN_MESSAGE,
} from "src/constants/auth";

export class AuthRegisterDTO {
  @IsEmail()
  email: string;

  @MinLength(4, {
    message: REGISTER_USERNAME_MIN_MESSAGE,
  })
  @MaxLength(50, {
    message: REGISTER_USERNAME_MAX_MESSAGE,
  })
  @IsString()
  username: string;

  @MinLength(8, {
    message: REGISTER_PASSWORD_MIN_MESSAGE,
  })
  @MaxLength(50, {
    message: REGISTER_PASSWORD_MAX_MESSAGE,
  })
  @IsString()
  password: string;
}

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: REGISTER_PASSWORD_MIN_MESSAGE,
  })
  @MaxLength(50, {
    message: REGISTER_PASSWORD_MAX_MESSAGE,
  })
  @IsString()
  password: string;
}

export class RefreshTokenDTO {
  refreshToken: string;
}
