import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthRegisterDTO } from "./auth.dto";
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
      const isUserAlreadyExist = await this.userService.findByEmail(
        registerDTO.email,
      );

      if (isUserAlreadyExist) {
        throw new BadRequestException(USER_ALREADY_EXISTS_MESSAGE);
      }
    } catch (error) {
      await this.userService.create(
        registerDTO.email,
        registerDTO.username,
        await hash(registerDTO.password),
      );

      const user = await this.userService.findByEmail(registerDTO.email);

      const tokens = await this.issueTokens(user.user_id);

      return { user, ...tokens };
    }
  }

  async login(loginDTO: AuthLoginDTO) {
    const user = await this.validateUser(loginDTO);
    const tokens = await this.issueTokens(user.user_id);

    return { user: user, ...tokens };
  }

  async getNewTokens(dto: AuthRefreshTokenDTO) {
    const refreshToken = dto.refreshToken;

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException(INVALID_REFRESH_TOKEN_MESSAGE);
    }

    const user = await this.userService.findById(result.id);

    const tokens = await this.issueTokens(user.user_id);

    return { user, ...tokens };
  }

  private async issueTokens(userId: number) {
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

    return user;
  }
}
