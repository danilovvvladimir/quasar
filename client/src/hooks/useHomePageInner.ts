import CategoryService from "@/services/category";
import ProductService from "@/services/product";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export interface IOption {
  value: string;
  label: string;
}

export interface IFilters {
  minPrice: number;
  maxPrice: number;
  currentMinPrice: number;
  currentMaxPrice: number;
  categories: string[];
  selectedCategories: string[];
  rating: number;
  isDiscount: boolean;
  take: number;
  skip: number;
}

export interface ISorting {
  options: IOption[];
  selectedOption: IOption;
}

export const MAX_PRODUCTS_PER_PAGE: number = 8;

const useHomePageInner = () => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProductsCount, setAllProductsCount] = useState<number>(0);

  const [filters, setFilters] = useState<IFilters>({
    currentMinPrice: 500,
    currentMaxPrice: 5000,
    minPrice: 0,
    maxPrice: 1,
    categories: [],
    selectedCategories: [],
    rating: 0,
    isDiscount: false,
    take: MAX_PRODUCTS_PER_PAGE,
    skip: 0,
  });

  const [sorting, setSorting] = useState<ISorting>({
    options: [
      { value: "price-asc", label: "По цене +" },
      { value: "price-desc", label: "По цене -" },
      { value: "date-asc", label: "По новизне +" },
      { value: "date-desc", label: "По новизне -" },
    ],
    selectedOption: { value: "price-asc", label: "По цене +" },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const setSelectedOption = (newSelectedOption: IOption | null): void => {
    if (!newSelectedOption) {
      return;
    }

    setSorting({ ...sorting, selectedOption: newSelectedOption });
  };

  const fetchProducts = async () => {
    const products = await productService.getAll({
      filters,
      sorting,
      searchTerm,
    });

    setProducts(products.products);
    setAllProductsCount(products.count);
  };

  const changePage = (newPageNumber: number) => {
    setFilters({
      ...filters,
      skip: (newPageNumber - 1) * MAX_PRODUCTS_PER_PAGE,
    });
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    const categories = await categoryService.getAll();
    const minMaxPrices = await productService.getMinMaxPrices();

    setFilters({
      ...filters,
      categories: categories.map((category) => category.name),
      minPrice: +minMaxPrices.min,
      maxPrice: +minMaxPrices.max,
      currentMinPrice: +minMaxPrices.min,
      currentMaxPrice: +minMaxPrices.max,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sorting, filters]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    allProductsCount,
    changePage,
    isLoading,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    sorting,
    setSelectedOption,
    products,
  };
};

export default useHomePageInner;
