import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const PG_CONNECTION = "PG_CONNECTION";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        return new Pool({
          user: configService.get("DB_USER"),
          host: configService.get("DB_HOST"),
          database: configService.get("DB_NAME"),
          password: configService.get("DB_PASSWORD"),
          port: configService.get("DB_PORT"),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}
