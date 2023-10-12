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

const HomePageInner: FC<HomePageInnerProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const MIN_PRICE = 500;
  const MAX_PRICE = 5000;
  const CATEGORIES = ["Футболки", "Обувь", "Худи", "Шорты", "Кофты"];
  const options = [
    { value: "by-rating", label: "По рейтингу -" },
    { value: "price-asc", label: "По цене -" },
    { value: "price-desc", label: "По цене +" },
    { value: "date-asc", label: "По новизне -" },
    { value: "date-desc", label: "По новизне +" },
  ];
  const productService = new ProductService();

  const fetchProducts = async () => {
    const products = await productService.getAll();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles["home-page__wrapper"]}>
      <Filters
        minPrice={MIN_PRICE}
        maxPrice={MAX_PRICE}
        categories={CATEGORIES}
      />
      <div className={styles["home-page__content"]}>
        <div className={styles["home-page__top-filters"]}>
          <Search />
          <Select options={options} />
        </div>
        <ProductsList />
      </div>
    </div>
  );
};

export default HomePageInner;
