import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";
import { IFilters, ISorting } from "@/hooks/useHomePageInner";
import { ProductCreateDTO, Product, UploadedFile } from "@/types/product";

export interface AllProductsConfig {
  filters?: IFilters;
  sorting?: ISorting;
  searchTerm?: string;
}

export interface ProductsWithCount {
  products: Product[];
  count: number;
}

interface MinMaxPrice {
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
      queryParams.append("take", filters.take.toString());
      queryParams.append("skip", filters.skip.toString());
    }

    if (sorting) {
      queryParams.append("sort", sorting.selectedOption.value);
    }

    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }

    const response = await defaultAxios.get<ProductsWithCount>(
      `${this.PRODUCT_BASE_API}?${queryParams.toString()}`,
    );

    console.log("get all products", response);

    return response.data;
  }

  async getAllAdminProducts() {
    const response = await defaultAxios.get<ProductsWithCount>(
      `${this.PRODUCT_BASE_API}`,
    );

    return response.data;
  }
  async getMinMaxPrices() {
    const response = await defaultAxios.get<MinMaxPrice>(
      `${this.PRODUCT_BASE_API}/min-max`,
    );

    return response.data;
  }

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await updatedAxios.post<UploadedFile>(
      `${API_URL}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

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

    return response.data;
  }

  async getBySlug(slug: string) {
    const response = await defaultAxios.get<Product>(
      `${this.PRODUCT_BASE_API}/by-slug/${slug}`,
    );

    return response.data;
  }

  async delete(id: string) {
    const response = await updatedAxios.delete<Product>(
      `${this.PRODUCT_BASE_API}/${id}`,
    );

    return response.data;
  }
}

export default ProductService;
