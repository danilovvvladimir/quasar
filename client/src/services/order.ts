import updatedAxios from "@/axios";
import { API_URL } from "@/constants/api";
import { AdminOrder, Order, OrderCreateDTO } from "@/types/order";
import defaultAxios from "axios";

class OrderService {
  private readonly ORDER_BASE_API: string = `${API_URL}/orders`;

  async getAll() {
    const response = await updatedAxios.get<AdminOrder[]>(
      `${this.ORDER_BASE_API}`,
    );

    return response.data;
  }

  async getByUser(userId: string) {
    const response = await updatedAxios.get<any[]>(
      `${this.ORDER_BASE_API}/by-user/${userId}`,
    );

    return response.data;
  }

  async create(dto: OrderCreateDTO) {
    const { orderItems, userId } = dto;
    const response = await updatedAxios.post<any>(`${this.ORDER_BASE_API}`, {
      userId,
      orderItems,
    });

    return response.data;
  }

  async changeUserOrderStatus(newOrderStatus: string, id: string) {
    const response = await updatedAxios.put<Order>(
      `${this.ORDER_BASE_API}/status`,
      {
        newOrderStatus,
        id,
      },
    );

    return response.data;
  }
}

export default OrderService;
