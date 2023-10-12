import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";

class ProductService {
  private readonly PRODUCT_BASE_API: string = `${API_URL}/products`;

  async getAll() {
    const response = await defaultAxios.get<any>(`${this.PRODUCT_BASE_API}`);

    console.log("Get all products response", response);

    return response.data;
  }
}

export default ProductService;
