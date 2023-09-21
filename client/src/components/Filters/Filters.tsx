"use client";

import { ChangeEvent, FC, useState } from "react";
import "./Filters.scss";
import Slider from "react-slider";
import Input from "../UI/Input/Input";
import Checkbox from "../UI/Checkbox/Checkbox";
import Toggler from "../UI/Toggler/Toggler";
import RatingFilter from "./RatingFilter/RatingFilter";

interface FiltersProps {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}

const Filters: FC<FiltersProps> = ({ minPrice, maxPrice, categories }) => {
  const [prices, setPrices] = useState([minPrice, maxPrice]);
  console.log("values:", prices);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPrice = parseInt(e.target.value, 10);

    if (isNaN(newPrice)) {
      return;
    }

    if (newPrice >= minPrice && newPrice <= prices[1]) {
      setPrices([newPrice, prices[1]]);
    }

    if (newPrice > prices[1]) {
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

    if (newPrice < prices[0]) {
      setPrices([prices[0], prices[0]]);
    }
  };

  return (
    <div className="filters">
      <div className="filters__item">
        <h3 className="title filters__item-title">Цена</h3>
        <Slider
          className="price-slider"
          value={prices}
          min={minPrice}
          max={maxPrice}
          onChange={setPrices}
        />
        <div className="filters__item-inputs">
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
      <div className="filters__item">
        <h3 className="title filters__item-title">Категории</h3>
        <ul className="categories-list">
          {categories.map((c) => (
            <Checkbox
              key={c}
              labelText={c}
              labelClassName="categories-list__item"
            />
          ))}
        </ul>
      </div>
      <div className="filters__item">
        <h3 className="title filters__item-title">Рейтинг</h3>
        <RatingFilter />
      </div>
      <div className="filters__item filters__item--inline">
        <h3 className="title filters__item-title">Товары со скидкой</h3>
        <Toggler />
      </div>
    </div>
  );
};

export default Filters;
