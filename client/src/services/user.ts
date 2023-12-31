import { API_URL } from "@/constants/api";
import { CartItemCreate, User, UserUpdateDTO } from "@/types/user";
import updatedAxios from "@/axios";
import { Product, ProductCart } from "@/types/product";

class UserService {
  private readonly USER_BASE_API: string = `${API_URL}/users`;

  async getAll() {
    const response = await updatedAxios.get<User[]>(`${this.USER_BASE_API}`);

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
    const response = await updatedAxios.get<ProductCart[]>(
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

  async update(dto: UserUpdateDTO) {
    const { email, password, username } = dto;

    const response = await updatedAxios.put<User>(`${this.USER_BASE_API}`, {
      email,
      username,
      password,
    });

    return response.data;
  }

  async toggleAdminRole(isAdmin: boolean, userId: string) {
    const response = await updatedAxios.put<User>(
      `${this.USER_BASE_API}/toggle-admin`,
      {
        userId,
        isAdmin,
      },
    );

    return response.data;
  }
}

export default UserService;
