// interface IFilters {
//   minPrice: number;
//   maxPrice: number;
//   currentMinPrice: number;
//   currentMaxPrice: number;
//   categories: string[];
//   selectedCategories: string[];
//   rating: number;
//   isDiscount: boolean;
// }

// interface ISorting {
//   options: IOption[];
//   selectedOption: IOption;
// }

interface IOption {
  value: string;
  label: string;
}

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
  take?: number;
  skip?: number;
}
