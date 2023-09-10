import { Inject, Injectable } from "@nestjs/common";
import { Pool, QueryResult } from "pg";
import { PG_CONNECTION } from "src/database/database.module";
import { ReviewQueryCreatorService } from "src/queries/reviewQueryCreator.service";
import { Review } from "src/types/user";
import { UserService } from "src/user/user.service";

@Injectable()
export class ReviewService {
  constructor(
    @Inject(PG_CONNECTION) private connectionService: Pool,
    private readonly reviewQueryCreatorService: ReviewQueryCreatorService,
    private readonly userService: UserService,
  ) {}

  async getProductReviews(productId: number) {
    // Сначала чекаем, есть ли такой продукт

    const response: QueryResult<Review> = await this.connectionService.query(
      this.reviewQueryCreatorService.getReviewsByProductIdQuery(productId),
    );

    return response.rows;
  }

  async getUserReviews(userId: number) {
    await this.userService.findById(userId);

    const response: QueryResult<Review> = await this.connectionService.query(
      this.reviewQueryCreatorService.getReviewsByUserIdQuery(userId),
    );

    return response.rows;
  }
}
