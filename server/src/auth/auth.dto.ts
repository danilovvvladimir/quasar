import { IsEmail, MinLength, IsString, MaxLength } from "class-validator";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  REGISTER_PASSWORD_MAX_MESSAGE,
  REGISTER_PASSWORD_MIN_MESSAGE,
  REGISTER_USERNAME_MAX_MESSAGE,
  REGISTER_USERNAME_MIN_MESSAGE,
  USERNAME_MIN_LENGTH,
} from "src/constants/auth";

export class AuthRegisterDTO {
  @IsEmail()
  email: string;

  @MinLength(USERNAME_MIN_LENGTH, {
    message: REGISTER_USERNAME_MIN_MESSAGE,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: REGISTER_USERNAME_MAX_MESSAGE,
  })
  @IsString()
  username: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: REGISTER_PASSWORD_MIN_MESSAGE,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: REGISTER_PASSWORD_MAX_MESSAGE,
  })
  @IsString()
  password: string;
}

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: REGISTER_PASSWORD_MIN_MESSAGE,
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: REGISTER_PASSWORD_MAX_MESSAGE,
  })
  @IsString()
  password: string;
}

export class RefreshTokenDTO {
  refreshToken: string;
}
