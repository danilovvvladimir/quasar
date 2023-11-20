"use client";

import { FC, ChangeEventHandler, useState } from "react";
import Select from "react-select";
import { Category } from "@/types/category";
import { SELECT_CATEGORY_PLACEHOLDER_MESSAGE } from "@/constants/messages";
import { CategoryOption } from "@/types/product";

interface CategorySelectProps {
  categories: Category[];
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedOptions: CategoryOption[];
  setSelectedOptions: (CategoryOption: any[]) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({
  categories,
  onChange,
  name,
  selectedOptions,
  setSelectedOptions,
}) => {
  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
    id: category.id,
  }));

  const handleSelectChange = (selectedOptions: any[]) => {
    setSelectedOptions(selectedOptions);
    // @ts-ignore
    onChange(selectedOptions);
  };

  return (
    <Select
      isMulti
      options={categoriesOptions}
      placeholder={SELECT_CATEGORY_PLACEHOLDER_MESSAGE}
      name={name}
      // @ts-ignore
      onChange={handleSelectChange}
      value={selectedOptions}
    />
  );
};

export default CategorySelect;
