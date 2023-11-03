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
}

export interface ISorting {
  options: IOption[];
  selectedOption: IOption;
}

const useHomePageInner = () => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<IFilters>({
    currentMinPrice: 500,
    currentMaxPrice: 5000,
    minPrice: 0,
    maxPrice: 1,
    categories: [],
    selectedCategories: [],
    rating: 1,
    isDiscount: false,
  });

  const [sorting, setSorting] = useState<ISorting>({
    options: [
      { value: "by-rating", label: "По рейтингу -" },
      { value: "price-asc", label: "По цене +" },
      { value: "price-desc", label: "По цене -" },
      { value: "date-asc", label: "По новизне +" },
      { value: "date-desc", label: "По новизне -" },
    ],
    selectedOption: { value: "by-rating", label: "По рейтингу -" },
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

    setProducts(products);
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
    isLoading,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    sorting,
    setSelectedOption,
    products,
    fetchProducts,
  };
};

export default useHomePageInner;
