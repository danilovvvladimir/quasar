"use client";

import { FC, ChangeEventHandler } from "react";
import styles from "./CategorySelect.module.scss";
import Select from "react-select";
import { Category } from "@/types/category";

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

  return (
    <Select
      isMulti
      options={categoriesOptions}
      placeholder="Выберите категорию"
      name={name}
      onChange={onChange}
    />
  );
};

export default CategorySelect;
