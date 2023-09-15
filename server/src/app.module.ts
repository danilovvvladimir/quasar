import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ReviewModule } from "./review/review.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { FileModule } from "./file/file.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: "./uploads",
    }),
    AuthModule,
    UserModule,
    ReviewModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
