import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import { Category } from "@/types/category";

export interface AdminPanelStatistics {
  users: number;
  reviews: number;
  orders: number;
  totalIncome: number;
}

class AdminService {
  private readonly STATISTICS_BASE_API: string = `${API_URL}/users/statistics`;

  async getStatistics() {
    const response = await updatedAxios.get<AdminPanelStatistics>(
      `${this.STATISTICS_BASE_API}`,
    );

    console.log("getStatistics response", response);

    return response.data;
  }
}

export default AdminService;
