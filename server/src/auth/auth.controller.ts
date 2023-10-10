import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDTO, AuthLoginDTO, RefreshTokenDTO } from "./auth.dto";
import { RefreshTokenGuard } from "src/guard/refreshToken";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("register")
  async register(@Body() dto: AuthRegisterDTO) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthLoginDTO) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("refresh")
  @UseGuards(RefreshTokenGuard)
  async getNewTokens(@Body() refreshToken: RefreshTokenDTO) {
    return this.authService.getNewTokens(refreshToken);
  }
}
