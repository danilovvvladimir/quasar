import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ReviewService } from "./review.service";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("product/:productId")
  async getProductReviews(@Param("productId", ParseIntPipe) productId: number) {
    return this.reviewService.getProductReviews(productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("users/:userId")
  async getUserReviews(@Param("userId", ParseIntPipe) userId: number) {
    return this.reviewService.getUserReviews(userId);
  }
}
