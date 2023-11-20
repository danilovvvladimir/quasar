"use client";

import { FC } from "react";
import Filters from "../Filters/Filters";
import styles from "@/app/HomePage.module.scss";
import ProductsList from "../ProductsList/ProductsList";
import Search from "../Search/Search";
import Select from "../UI/Select/Select";
import Loader from "../Loader/Loader";
import useHomePageInner, {
  MAX_PRODUCTS_PER_PAGE,
} from "@/hooks/useHomePageInner";

interface HomePageInnerProps {}

const HomePageInner: FC<HomePageInnerProps> = () => {
  const {
    filters,
    isLoading,
    products,
    searchTerm,
    setFilters,
    setSearchTerm,
    setSelectedOption,
    sorting,
    allProductsCount,
    changePage,
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
            placeholder="Сортировка"
            classNamePrefix="custom-select"
            options={sorting.options}
            selectedOption={sorting.selectedOption}
            setSelectedOption={setSelectedOption}
            isSearchable={false}
          />
        </div>
        {
          <ProductsList
            products={products}
            paginationConfig={{
              numberPages: Math.ceil(allProductsCount / MAX_PRODUCTS_PER_PAGE),
              currentPage: filters.skip / MAX_PRODUCTS_PER_PAGE + 1,
              changePage: changePage,
            }}
          />
        }
      </div>
    </div>
  );
};

export default HomePageInner;
