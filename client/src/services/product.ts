import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";
import { IFilters, ISorting } from "@/hooks/useHomePageInner";
import { IUploadedFile, ProductCreateDTO, Product } from "@/types/product";

export interface AllProductsConfig {
  filters?: IFilters;
  sorting?: ISorting;
  searchTerm?: string;
}

interface IMinMaxPrice {
  min: number;
  max: number;
}

class ProductService {
  private readonly PRODUCT_BASE_API: string = `${API_URL}/products`;

  async getAll(allProductsConfig: AllProductsConfig) {
    const { filters, searchTerm, sorting } = allProductsConfig;
    const queryParams = new URLSearchParams();

    if (filters) {
      queryParams.append(
        "selectedCategories",
        filters.selectedCategories.join(";"),
      );
      queryParams.append("currentMinPrice", filters.currentMinPrice.toString());
      queryParams.append("currentMaxPrice", filters.currentMaxPrice.toString());
      queryParams.append("isDiscount", `${filters.isDiscount}`);
      queryParams.append("rating", filters.rating.toString());
    }

    if (sorting) {
      queryParams.append("sort", sorting.selectedOption.value);
    }

    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    const response = await defaultAxios.get<any>(
      `${this.PRODUCT_BASE_API}?${queryParams.toString()}`,
    );

    console.log("Get all products response", response);

    return response.data;
  }

  async getAllAdminProducts() {
    const response = await defaultAxios.get<any[]>(`${this.PRODUCT_BASE_API}`);

    console.log("Get all products response", response);

    return response.data;
  }
  async getMinMaxPrices() {
    const response = await defaultAxios.get<IMinMaxPrice>(
      `${this.PRODUCT_BASE_API}/min-max`,
    );

    return response.data;
  }

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await updatedAxios.post<IUploadedFile>(
      `${API_URL}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("Get uploadImage response", response);

    return response.data;
  }

  async create(dto: ProductCreateDTO) {
    const {
      currentPrice,
      description,
      imagePaths,
      name,
      slug,
      details,
      categoryIds,
      oldPrice,
    } = dto;

    const response = await updatedAxios.post(`${this.PRODUCT_BASE_API}`, {
      name,
      currentPrice,
      description,
      imagePaths,
      slug,
      categoryIds,
      details,
      oldPrice,
    });

    console.log("Get create response", response);

    return response.data;
  }

  async getBySlug(slug: string) {
    const response = await defaultAxios.get<Product>(
      `${this.PRODUCT_BASE_API}/by-slug/${slug}`,
    );

    console.log("Get getBySlug response", response);

    return response.data;
  }

  async delete(id: string) {
    const response = await updatedAxios.delete<Product>(
      `${this.PRODUCT_BASE_API}/${id}`,
    );

    console.log("Get deleteProduct response", response);

    return response.data;
  }
}

export default ProductService;
