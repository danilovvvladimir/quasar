import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { UserModule } from "src/user/user.module";
import { PrismaService } from "src/database/prisma.service";
import { ProductModule } from "src/product/product.module";

@Module({
  imports: [UserModule, ProductModule],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
})
export class ReviewModule {}
