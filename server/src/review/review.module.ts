import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { DatabaseModule } from "src/database/database.module";
import { ReviewQueryCreatorService } from "src/queries/reviewQueryCreator.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ReviewController, ReviewQueryCreatorService],
  providers: [ReviewService],
})
export class ReviewModule {}
