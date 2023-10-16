"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./CreateCategoryForm.module.scss";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Separator from "../Separator/Separator";
import Toggler from "../UI/Toggler/Toggler";
import { Category } from "@/types/category";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { createSlug } from "@/utils/createSlug";
import CategoryService from "@/services/category";
import Loader from "../Loader/Loader";
import { useDebounce } from "@/hooks/useDebounce";
import { slugRegex } from "@/constants/regex";

interface CreateCategoryFormProps {}

interface ICreatingCategory
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}
// const [creatingProduct, setCreatingProduct] = useState<ICreatingCategory>({
//   name: "",
//   slug: "",
// });

const CreateCategoryForm: FC<CreateCategoryFormProps> = () => {
  const categoryService = new CategoryService();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatingCategory>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ICreatingCategory> = async (values) => {
    try {
      console.log(values);

      const data = await categoryService.createCategory(
        values.name,
        values.slug,
      );

      createNotify("Категория успешно создана", notifyMode.SUCCESS);
      reset();
    } catch (error) {
      console.log(error);

      createNotify("Something went wrong...", notifyMode.ERROR);
    }
  };

  return (
    <div className={styles["create-category-form"]}>
      <div className={styles["create-category-form__header"]}>
        <h2 className={`title ${styles["create-category-form__title"]}`}>
          Создание категории
        </h2>
        <Separator />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["create-category-form__content"]}
      >
        <div className={styles["create-category-form__name"]}>
          <label className={styles["create-category-form__label"]}>
            <h4
              className={`title ${styles["create-category-form__label-title"]}`}
            >
              Название
            </h4>
            <input
              className="input"
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              type="text"
            />
            {errors.name && (
              <div className="auth-form__error">{errors.name.message}</div>
            )}
          </label>
        </div>
        <div className={styles["create-category-form__slug"]}>
          <label className={styles["create-category-form__label"]}>
            <h4
              className={`title ${styles["create-category-form__label-title"]}`}
            >
              Slug
            </h4>
            <input
              className="input"
              {...register("slug", {
                required: { value: true, message: "Slug is required" },
                pattern: { value: slugRegex, message: "Slug is invalid!" },
              })}
              type="text"
            />
            {errors.slug && (
              <div className="auth-form__error">{errors.slug.message}</div>
            )}
          </label>
        </div>
        <div className={styles["create-category-form__apply"]}>
          <Button
            type="submit"
            className={styles["create-category-form__create"]}
          >
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
