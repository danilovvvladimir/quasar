import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import { Category } from "@/types/category";

class AdminService {
  private readonly STATISTICS_BASE_API: string = `${API_URL}/users/statistics`;

  async getStatistics() {
    const response = await updatedAxios.get<Category[]>(
      `${this.STATISTICS_BASE_API}`,
    );

    console.log("getStatistics response", response);

    return response.data;
  }
}

export default AdminService;
