import updatedAxios from "@/axios";
import { API_URL } from "@/constants/api";
import { OrderCreateDTO } from "@/types/order";
import defaultAxios from "axios";

class OrderService {
  private readonly ORDER_BASE_API: string = `${API_URL}/orders`;

  // async getAll() {
  //   const response = await updatedAxios.get<Category[]>(
  //     `${this.ORDER_BASE_API}`,
  //   );

  //   return response.data;
  // }

  async create(dto: OrderCreateDTO) {
    const { orderItems, userId } = dto;
    const response = await updatedAxios.post<any>(`${this.ORDER_BASE_API}`, {
      userId,
      orderItems,
    });

    console.log("response createorder", response);

    return response.data;
  }
}

export default OrderService;
