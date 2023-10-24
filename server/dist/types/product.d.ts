export interface AllProductsConfig {
    minPrice?: number;
    maxPrice?: number;
    currentMinPrice?: number;
    currentMaxPrice?: number;
    categories?: string[];
    selectedCategories?: string[];
    rating?: number;
    isDiscount?: boolean;
    sorting?: string;
    searchTerm?: string;
}
