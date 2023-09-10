import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "src/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";
import { getJwtConfig } from "src/config/jwt";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
