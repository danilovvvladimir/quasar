"use client";

import { FC, useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import styles from "@/app/HomePage.module.scss";
import ProductsList from "../ProductsList/ProductsList";
import Search from "../Search/Search";
import Select from "../UI/Select/Select";
import ProductService from "@/services/product";
import { Product } from "@/types/product";

interface HomePageInnerProps {}

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

const HomePageInner: FC<HomePageInnerProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [filters, setFilters] = useState<IFilters>({
    currentMinPrice: 500,
    currentMaxPrice: 5000,
    minPrice: 500,
    maxPrice: 5000,
    categories: ["Футболки", "Обувь", "Худи", "Шорты", "Кофты"],
    selectedCategories: [],
    rating: 1,
    isDiscount: false,
  });

  const [sorting, setSorting] = useState<ISorting>({
    options: [
      { value: "by-rating", label: "По рейтингу -" },
      { value: "price-asc", label: "По цене -" },
      { value: "price-desc", label: "По цене +" },
      { value: "date-asc", label: "По новизне -" },
      { value: "date-desc", label: "По новизне +" },
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

  const productService = new ProductService();

  const fetchProducts = async () => {
    const products = await productService.getAll({
      filters,
      sorting,
      searchTerm,
    });
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles["home-page__wrapper"]}>
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles["home-page__content"]}>
        <div className={styles["home-page__top-filters"]}>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Select
            options={sorting.options}
            selectedOption={sorting.selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default HomePageInner;
