import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "src/database/prisma.service";
import { CategoryModule } from "src/category/category.module";

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
