import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";

import { IReviewRequest } from "@/types/common";

class ReviewService {
  private readonly REVIEW_BASE_API: string = `${API_URL}/reviews`;

  async create(dto: IReviewRequest) {
    const { rating, text, productId, userId } = dto;

    const response = await updatedAxios.post(`${this.REVIEW_BASE_API}`, {
      rating,
      text,
      productId,
      userId,
    });

    console.log("review create response", response);

    return response.data;
  }

  async getByProductId(productId: string) {
    const response = await defaultAxios.get(
      `${this.REVIEW_BASE_API}/by-product/${productId}`,
    );

    console.log("review getByProductId response", response);

    return response.data;
  }
}

export default ReviewService;
