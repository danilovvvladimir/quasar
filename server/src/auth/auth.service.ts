import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { AuthLoginDTO, AuthRefreshTokenDTO, AuthRegisterDTO } from "./auth.dto";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // async register(registerDTO: AuthRegisterDTO) {
  //   const isUserAlreadyExist = await this.prismaService.user.findUnique({
  //     where: { email: registerDTO.email },
  //   });

  //   if (existedUser) {
  //     throw new BadRequestException("User already exists");
  //   }

  //   const user = await this.prismaService.user.create({
  //     data: {
  //       email: registerDTO.email,
  //       username: registerDTO.username,
  //       password: await hash(registerDTO.password),
  //     },
  //   });

  //   const tokens = await this.issueTokens(user.id);

  //   return { user: this.getUserFields(user), ...tokens };
  // }

  // async login(loginDTO: AuthLoginDTO) {
  //   const user = await this.validateUser(loginDTO);
  //   const tokens = await this.issueTokens(user.id);

  //   return { user: this.getUserFields(user), ...tokens };
  // }

  // async getNewTokens(dto: AuthRefreshTokenDTO) {
  //   const refreshToken = dto.refreshToken;

  //   const result = await this.jwtService.verifyAsync(refreshToken);

  //   if (!result) {
  //     throw new UnauthorizedException("Invalid refresh token");
  //   }

  //   const user = await this.prismaService.user.findUnique({
  //     where: { id: result.id },
  //   });

  //   const tokens = await this.issueTokens(user.id);

  //   return { user: this.getUserFields(user), ...tokens };
  // }

  // private async issueTokens(userId: number) {
  //   const data = { id: userId };

  //   const accessToken = this.jwtService.sign(data, {
  //     expiresIn: "1h",
  //   });

  //   const refreshToken = this.jwtService.sign(data, {
  //     expiresIn: "7d",
  //   });

  //   return { accessToken, refreshToken };
  // }

  // private getUserFields(user: User) {
  //   return {
  //     id: user.id,
  //     email: user.email,
  //   };
  // }

  // private async validateUser(loginDto: AuthLoginDTO) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { email: loginDto.email },
  //   });

  //   if (!user) {
  //     throw new NotFoundException("User not found");
  //   }

  //   const isValidPassword = await verify(user.password, loginDto.password);

  //   if (!isValidPassword) {
  //     throw new NotFoundException("Invalid Password");
  //   }

  //   return user;
  // }
}
