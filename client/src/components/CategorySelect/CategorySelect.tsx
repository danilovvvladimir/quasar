"use client";

import { FC, ChangeEventHandler, useState } from "react";
import Select from "react-select";
import { Category } from "@/types/category";
import { SELECT_CATEGORY_PLACEHOLDER_MESSAGE } from "@/constants/messages";

interface CategorySelectProps {
  categories: Category[];
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CategorySelect: FC<CategorySelectProps> = ({
  categories,
  onChange,
  name,
}) => {
  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
    id: category.id,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    // TODO: Поправить передачу
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions);
  };

  return (
    <Select
      isMulti
      options={categoriesOptions}
      placeholder={SELECT_CATEGORY_PLACEHOLDER_MESSAGE}
      name={name}
      onChange={handleSelectChange}
      value={selectedOptions}
    />
  );
};

export default CategorySelect;
