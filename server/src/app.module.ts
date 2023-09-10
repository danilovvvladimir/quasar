import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { UserQueryCreatorService } from "./queries/userQueryCreator.service";
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UserModule, ReviewModule, OrderModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, UserQueryCreatorService],
})
export class AppModule {}
