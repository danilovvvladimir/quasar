import { API_URL } from "@/constants/api";
import updatedAxios from "@/axios";
import defaultAxios from "axios";
import { IFilters, ISorting } from "@/components/HomePageInner/HomePageInner";

class ProductService {
  private readonly PRODUCT_BASE_API: string = `${API_URL}/products`;

  async getAll(filters: IFilters, sorting: ISorting, searchTerm: string) {
    const queryParams = new URLSearchParams();

    queryParams.append(
      "selectedCategories",
      filters.selectedCategories.join(";"),
    );
    queryParams.append("currentMinPrice", filters.currentMinPrice.toString());
    queryParams.append("currentMinPrice", filters.currentMaxPrice.toString());
    queryParams.append("isDiscount", `${filters.isDiscount}`);
    queryParams.append("rating", filters.rating.toString());
    queryParams.append("sort", sorting.selectedOption.value);
    queryParams.append("searchTerm", searchTerm);

    const response = await defaultAxios.get<any>(
      `${this.PRODUCT_BASE_API}?${queryParams.toString()}`,
    );

    // const response = await defaultAxios.get<any>(`${this.PRODUCT_BASE_API}`);

    console.log("Get all products response", response);

    return response.data;
  }
}

export default ProductService;
