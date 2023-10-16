import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import { Category } from "@/types/category";

class CategoryService {
  private readonly CATEGORY_BASE_API: string = `${API_URL}/categories`;

  async getAll() {
    const response = await updatedAxios.get<Category[]>(
      `${this.CATEGORY_BASE_API}`,
    );

    return response.data;
  }

  async checkSlugExists(slug: string): Promise<boolean> {
    try {
      const response = await updatedAxios.get<any>(
        `${this.CATEGORY_BASE_API}/by-slug/${slug}`,
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async createCategory(name: string, slug: string) {
    const response = await updatedAxios.post<any>(`${this.CATEGORY_BASE_API}`, {
      name,
      slug,
    });

    console.log("response createCategory", response);

    return response.data;
  }
}

export default CategoryService;
