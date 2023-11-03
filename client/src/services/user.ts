import { API_URL } from "@/constants/api";
import { CartItemCreate, User } from "@/types/user";
import updatedAxios from "@/axios";

class UserService {
  private readonly USER_BASE_API: string = `${API_URL}/users`;

  async getAll() {
    const response = await updatedAxios.get<User[]>(`${this.USER_BASE_API}`);
    console.log("get all users response", response);

    return response.data;
  }

  async createCartItem(dto: CartItemCreate) {
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

    return response.data;
  }

  async toggleWishlistItem(userId: string, productId: string) {
    const response = await updatedAxios.post(
      `${this.USER_BASE_API}/wishlist-item/:id`,
      {
        productId,
        userId,
      },
    );

    return response.data;
  }

  async deleteCartItem(id: string) {
    const response = await updatedAxios.delete(
      `${this.USER_BASE_API}/cart-item/${id}`,
    );

    return response.data;
  }

  async getCartItems(userId: string) {
    const response = await updatedAxios.get(
      `${this.USER_BASE_API}/${userId}/cart-items`,
    );

    return response.data;
  }

  async getWishlistItems(userId: string) {
    const response = await updatedAxios.get(
      `${this.USER_BASE_API}/${userId}/wishlist-items`,
    );

    return response.data;
  }
}

export default UserService;
