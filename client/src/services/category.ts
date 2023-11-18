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
      await updatedAxios.get<any>(`${this.CATEGORY_BASE_API}/by-slug/${slug}`);

      return true;
    } catch (error) {
      return false;
    }
  }

  async create(name: string, slug: string) {
    const response = await updatedAxios.post(`${this.CATEGORY_BASE_API}`, {
      name,
      slug,
    });

    return response.data;
  }

  async update(name: string, slug: string, id: string) {
    const response = await updatedAxios.put(`${this.CATEGORY_BASE_API}/${id}`, {
      name,
      slug,
    });

    return response.data;
  }

  async delete(id: string) {
    const response = await updatedAxios.delete(
      `${this.CATEGORY_BASE_API}/${id}`,
    );

    return response.data;
  }
}

export default CategoryService;
