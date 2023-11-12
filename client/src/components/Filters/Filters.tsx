"use client";

import { ChangeEvent, FC, useState } from "react";
import Slider from "react-slider";
import Input from "../UI/Input/Input";
import CheckBoxWithLabel from "../UI/CheckBoxWithLabel/CheckBoxWithLabel";
import Toggler from "../UI/Toggler/Toggler";
import RatingFilter from "./RatingFilter/RatingFilter";
import styles from "./Filters.module.scss";
import classNames from "classnames";
import useFilters from "@/hooks/useFilters";
import { IFilters } from "@/hooks/useHomePageInner";

interface FiltersProps {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

const Filters: FC<FiltersProps> = ({ filters, setFilters }) => {
  const {
    currentMinPrice,
    currentMaxPrice,
    maxPrice,
    minPrice,
    prices,
    setPrices,
    changeOriginalPrices,
    handleMinPriceChange,
    handleMaxPriceChange,
    categories,
    selectedCategories,
    selectCategory,
    rating,
    setRating,
    toggleDiscount,
    isDiscount,
  } = useFilters({ filters, setFilters });

  return (
    <div className={styles["filters"]}>
      <div className={styles["filters__item"]}>
        <h3 className={`title ${styles["filters__item-title"]}`}>Цена</h3>
        <Slider
          className={styles["price-slider"]}
          thumbClassName={classNames(styles["thumb"], styles["price-slider"])}
          thumbActiveClassName={classNames(
            styles["thumb-active"],
            styles["price-slider"],
          )}
          value={[currentMinPrice, currentMaxPrice]}
          min={minPrice}
          max={maxPrice}
          onChange={setPrices}
          onAfterChange={changeOriginalPrices}
        />

        <div className={styles["filters__item-inputs"]}>
          <Input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={prices[0]}
            onChange={handleMinPriceChange}
          />
          <Input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={prices[1]}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
      <div className={styles["filters__item"]}>
        <h3 className={`title ${styles["filters__item-title"]}`}>Категории</h3>
        <ul className={styles["categories-list"]}>
          {categories.map((c) => (
            <CheckBoxWithLabel
              isChecked={!!selectedCategories.find((item) => item === c)}
              handleCheckboxChange={() => selectCategory(c)}
              key={c}
              labelText={c}
              labelClassName={styles["categories-list__item"]}
            />
          ))}
        </ul>
      </div>
      <div className={styles["filters__item"]}>
        <h3 className={`title ${styles["filters__item-title"]}`}>Рейтинг</h3>
        <RatingFilter selectedRating={rating} setRating={setRating} />
      </div>
      <div
        className={classNames(
          styles["filters__item"],
          styles["filters__item--inline"],
        )}
      >
        <h3 className={`title ${styles["filters__item-title"]}`}>
          Товары со скидкой
        </h3>
        <Toggler onToggle={toggleDiscount} isToggle={isDiscount} />
      </div>
    </div>
  );
};

export default Filters;
