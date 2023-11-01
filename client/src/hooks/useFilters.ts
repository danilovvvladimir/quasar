import { ChangeEvent, useState } from "react";
import { IFilters } from "./useHomePageInner";

interface FiltersProps {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

const useFilters = ({ filters, setFilters }: FiltersProps) => {
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

  return {
    currentMinPrice,
    currentMaxPrice,
    maxPrice,
    minPrice,
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
    prices,
  };
};

export default useFilters;
