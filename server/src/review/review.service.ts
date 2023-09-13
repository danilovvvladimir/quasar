import { Inject, Injectable } from "@nestjs/common";
import { Pool, QueryResult } from "pg";
import { UserService } from "src/user/user.service";

@Injectable()
export class ReviewService {
  constructor(private readonly userService: UserService) {}

  // async getProductReviews(productId: number) {
  //   // Сначала чекаем, есть ли такой продукт

  //   const response: QueryResult<Review> = await this.connectionService.query(
  //     this.reviewQueryCreatorService.getReviewsByProductIdQuery(productId),
  //   );

  //   return response.rows;
  // }

  // async getUserReviews(userId: number) {
  //   await this.userService.findById(userId);

  //   const response: QueryResult<Review> = await this.connectionService.query(
  //     this.reviewQueryCreatorService.getReviewsByUserIdQuery(userId),
  //   );

  //   return response.rows;
  // }
}
