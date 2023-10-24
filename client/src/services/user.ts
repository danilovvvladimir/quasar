import { API_URL } from "@/constants/api";
import { CartItemCreate } from "@/types/user";
import updatedAxios from "@/axios";

class UserService {
  private readonly USER_BASE_API: string = `${API_URL}/users`;

  async create(dto: CartItemCreate) {
    const { productId, quantity, size, userId } = dto;

    const response = await updatedAxios.post(
      `${this.USER_BASE_API}/cart-item`,
      {
        productId,
        quantity,
        size,
        userId,
      },
    );

    console.log("create cartitem response", response);

    return response.data;
  }

  async getCartItems(userId: string) {
    const response = await updatedAxios.get(
      `${this.USER_BASE_API}/${userId}/cart-items`,
    );

    console.log("getCartItems cartitem response", response);

    return response.data;
  }
}

export default UserService;
