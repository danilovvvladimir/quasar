import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { AuthLoginDTO, AuthRegisterDTO, RefreshTokenDTO } from "./auth.dto";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  INVALID_PASSWORD_MESSAGE,
  INVALID_REFRESH_TOKEN_MESSAGE,
  REFRESH_TOKEN_EXPIRATION_TIME,
  USER_ALREADY_EXISTS_MESSAGE,
} from "src/constants/auth";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(registerDTO: AuthRegisterDTO) {
    try {
      await this.userService.findByEmail(registerDTO.email);
    } catch (error) {
      const user = await this.userService.create(
        registerDTO.email,
        registerDTO.username,
        await hash(registerDTO.password),
      );

      const tokens = await this.issueTokens(user.id);

      return { user, tokens };
    }

    throw new BadRequestException(USER_ALREADY_EXISTS_MESSAGE);
  }

  async login(loginDTO: AuthLoginDTO) {
    const user = await this.validateUser(loginDTO);
    const tokens = await this.issueTokens(user.id);

    return { user: user, tokens };
  }

  async getNewTokens(dto: RefreshTokenDTO) {
    const refreshToken = dto.refreshToken;

    try {
      const result = await this.jwtService.verifyAsync(refreshToken);

      if (!result) {
        throw new UnauthorizedException(INVALID_REFRESH_TOKEN_MESSAGE);
      }

      const user = await this.userService.findById(result.id);

      const tokens = await this.issueTokens(user.id);

      return { user, tokens };
    } catch (error) {
      throw new UnauthorizedException(INVALID_REFRESH_TOKEN_MESSAGE);
    }
  }

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(loginDto: AuthLoginDTO) {
    const user = await this.userService.findByEmail(loginDto.email);

    const isValidPassword = await verify(user.password, loginDto.password);

    if (!isValidPassword) {
      throw new NotFoundException(INVALID_PASSWORD_MESSAGE);
    }

    const { password, ...rest } = user;

    return rest;
  }
}
