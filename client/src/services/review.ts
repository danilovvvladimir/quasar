import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";

import { IReviewRequest, ReviewUpdateRequest } from "@/types/common";

class ReviewService {
  private readonly REVIEW_BASE_API: string = `${API_URL}/reviews`;

  async getAll() {
    const response = await updatedAxios.get(`${this.REVIEW_BASE_API}`);

    console.log("review getAll response", response);

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

    console.log("review create response", response);

    return response.data;
  }

  async delete(id: string) {
    const response = await updatedAxios.delete(`${this.REVIEW_BASE_API}/${id}`);

    console.log("review delete response", response);

    return response.data;
  }

  async update(dto: ReviewUpdateRequest, id: string) {
    const { rating, text } = dto;

    const response = await updatedAxios.put(`${this.REVIEW_BASE_API}/${id}`, {
      rating,
      text,
    });

    console.log("review update response", response);

    return response.data;
  }

  async getByProductId(productId: string) {
    const response = await defaultAxios.get(
      `${this.REVIEW_BASE_API}/by-product/${productId}`,
    );

    console.log("review getByProductId response", response);

    return response.data;
  }

  async getByUserId(userId: string) {
    const response = await updatedAxios.get(
      `${this.REVIEW_BASE_API}/by-user/${userId}`,
    );

    console.log("review getByUserId response", response);

    return response.data;
  }
}

export default ReviewService;
