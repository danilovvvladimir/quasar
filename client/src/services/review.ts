import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";

import { IReviewRequest, ReviewUpdateRequest } from "@/types/common";

class ReviewService {
  private readonly REVIEW_BASE_API: string = `${API_URL}/reviews`;

  async getAll() {
    const response = await updatedAxios.get(`${this.REVIEW_BASE_API}`);

    return response.data;
  }

  async create(dto: IReviewRequest) {
    const { rating, text, productId, userId } = dto;

    const response = await updatedAxios.post(`${this.REVIEW_BASE_API}`, {
      rating,
      text,
      productId,
      userId,
    });

    return response.data;
  }

  async delete(id: string) {
    const response = await updatedAxios.delete(`${this.REVIEW_BASE_API}/${id}`);

    return response.data;
  }

  async update(dto: ReviewUpdateRequest, id: string) {
    const { rating, text } = dto;

    const response = await updatedAxios.put(`${this.REVIEW_BASE_API}/${id}`, {
      rating,
      text,
    });

    return response.data;
  }

  async getByProductId(productId: string) {
    const response = await defaultAxios.get(
      `${this.REVIEW_BASE_API}/by-product/${productId}`,
    );

    return response.data;
  }

  async getByUserId(userId: string) {
    const response = await updatedAxios.get(
      `${this.REVIEW_BASE_API}/by-user/${userId}`,
    );

    return response.data;
  }
}

export default ReviewService;
