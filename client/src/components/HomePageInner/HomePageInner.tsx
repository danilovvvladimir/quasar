"use client";

import { FC } from "react";
import Filters from "../Filters/Filters";
import styles from "@/app/HomePage.module.scss";
import ProductsList from "../ProductsList/ProductsList";
import Search from "../Search/Search";
import Select from "../UI/Select/Select";
import Loader from "../Loader/Loader";
import useHomePageInner from "@/hooks/useHomePageInner";

interface HomePageInnerProps {}

// TODO
const HomePageInner: FC<HomePageInnerProps> = () => {
  const {
    fetchProducts,
    filters,
    isLoading,
    products,
    searchTerm,
    setFilters,
    setSearchTerm,
    setSelectedOption,
    sorting,
  } = useHomePageInner();

  if (isLoading) {
    return <Loader />;
  }

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
        <ProductsList products={products} fetchProducts={fetchProducts} />
      </div>
    </div>
  );
};

export default HomePageInner;
