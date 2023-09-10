import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/database/database.module";
import { UserQueryCreatorService } from "src/queries/userQueryCreator.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserQueryCreatorService],
})
export class UserModule {}
