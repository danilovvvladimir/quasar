"use client";

import { ChangeEvent, FC, useState } from "react";
import Slider from "react-slider";
import Input from "../UI/Input/Input";
import CheckBoxWithLabel from "../UI/CheckBoxWithLabel/CheckBoxWithLabel";
import Toggler from "../UI/Toggler/Toggler";
import RatingFilter from "./RatingFilter/RatingFilter";
import styles from "./Filters.module.scss";
import classNames from "classnames";
import { IFilters } from "../HomePageInner/HomePageInner";

interface FiltersProps {
  // minPrice: number;
  // maxPrice: number;
  // categories: string[];
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

const Filters: FC<FiltersProps> = ({ filters, setFilters }) => {
  const {
    categories,
    maxPrice,
    minPrice,
    isDiscount,
    currentMaxPrice,
    currentMinPrice,
    selectedCategories,
    rating,
  } = filters;

  const [prices, setPrices] = useState<number[]>([minPrice, maxPrice]);

  const changeOriginalPrices = (newPrices: number[]): void => {
    setFilters({
      ...filters,
      currentMinPrice: newPrices[0],
      currentMaxPrice: newPrices[1],
    });
  };

  const setRating = (newRating: number): void => {
    setFilters({ ...filters, rating: newRating });
  };

  const toggleDiscount = (newIsDiscount: boolean): void => {
    setFilters({ ...filters, isDiscount: newIsDiscount });
  };

  const selectCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setFilters({
        ...filters,
        selectedCategories: [...selectedCategories, category],
      });
    } else {
      setFilters({
        ...filters,
        selectedCategories: selectedCategories.filter(
          (item) => item !== category,
        ),
      });
    }
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPrice = parseInt(e.target.value, 10);

    if (isNaN(newPrice)) {
      return;
    }

    if (newPrice >= minPrice && newPrice <= prices[1]) {
      setPrices([newPrice, prices[1]]);
    }

    if (newPrice > currentMaxPrice) {
      setPrices([prices[1], prices[1]]);
    }
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPrice = parseInt(e.target.value, 10);

    if (isNaN(newPrice)) {
      return;
    }

    if (newPrice <= maxPrice && newPrice >= prices[0]) {
      setPrices([prices[0], newPrice]);
    }

    if (newPrice < currentMinPrice) {
      setPrices([prices[0], prices[0]]);
    }
  };

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
