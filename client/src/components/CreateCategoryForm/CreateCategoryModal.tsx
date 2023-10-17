"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./CreateCategoryModal.module.scss";
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
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import { ProductDetails, ProductImage } from "@/types/product";

interface CreateCategoryModalProps {}

interface ICreatingCategory
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}
// const [creatingProduct, setCreatingProduct] = useState<ICreatingCategory>({
//   name: "",
//   slug: "",
// });

interface ICreatingProductImage extends Pick<ProductImage, "imagePath"> {}

interface ICreatingProductDetails
  extends Pick<ProductDetails, "size" | "quantity"> {}

const CreateCategoryModal: FC<CreateCategoryModalProps> = () => {
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
    <div className={styles["create-category-modal"]}>
      <div className={styles["create-category-modal__header"]}>
        <h2 className={`title ${styles["create-category-modal__title"]}`}>
          Создание категории
        </h2>
        <Separator />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["create-category-modal__form"]}
      >
        <div className={styles["create-category-modal__content"]}>
          <div className={styles["create-category-modal__name"]}>
            <label className={styles["create-category-modal__label"]}>
              <span>Название</span>
              <input
                className="input"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                type="text"
              />
              {errors.name && (
                <ErrorValidationText text={errors.name.message!} />
              )}
            </label>
          </div>
          <div className={styles["create-category-modal__slug"]}>
            <label className={styles["create-category-modal__label"]}>
              <span>Slug</span>
              <input
                className="input"
                {...register("slug", {
                  required: { value: true, message: "Slug is required" },
                  pattern: { value: slugRegex, message: "Slug is invalid!" },
                })}
                type="text"
              />
              {errors.slug && (
                <ErrorValidationText text={errors.slug.message!} />
              )}
            </label>
          </div>
        </div>
        <div className={styles["create-category-modal__apply"]}>
          <Button
            type="submit"
            className={styles["create-category-modal__create"]}
          >
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryModal;
