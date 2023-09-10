import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewQueryCreatorService {
  getReviewByIdQuery(id: number) {
    return `SELECT *
    FROM review as r
    WHERE r.review_id = ${id};`;
  }

  getReviewsByProductIdQuery(id: number) {
    return `SELECT *
    FROM review as r
    WHERE r.product_id = ${id};`;
  }

  getReviewsByUserIdQuery(id: number) {
    return `SELECT *
    FROM review as r
    WHERE r.user_id = ${id};`;
  }
}
