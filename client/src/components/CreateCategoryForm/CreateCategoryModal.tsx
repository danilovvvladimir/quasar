"use client";

import { FC } from "react";
import styles from "./CreateCategoryModal.module.scss";
import Button from "../UI/Button/Button";
import Separator from "../Separator/Separator";
import { Category } from "@/types/category";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNotify, notifyMode } from "@/utils/createNotify";
import CategoryService from "@/services/category";
import { SLUG_REGEX } from "@/constants/regex";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import {
  CATEGORY_CREATE_NOTIFY_MESSAGE,
  CATEGORY_UPDATE_NOTIFY_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
} from "@/constants/messages";
import {
  CATEGORY_NAME_REQUIRED_MESSAGE,
  SLUG_REQUIRED_MESSAGE,
  INVALID_SLUG_MESSAGE,
} from "@/constants/validation";

interface CreateCategoryModalProps {
  category?: Category;
}

interface ICreatingCategory
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}

const CreateCategoryModal: FC<CreateCategoryModalProps> = ({ category }) => {
  const categoryService = new CategoryService();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatingCategory>({
    mode: "onChange",
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  const onSubmit: SubmitHandler<ICreatingCategory> = async (values) => {
    try {
      if (category) {
        await categoryService.update(values.name, values.slug, category.id);
        createNotify(CATEGORY_UPDATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
        reset({ name: values.name, slug: values.slug });
      } else {
        await categoryService.create(values.name, values.slug);
        createNotify(CATEGORY_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
        reset();
      }
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
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
                  required: {
                    value: true,
                    message: CATEGORY_NAME_REQUIRED_MESSAGE,
                  },
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
                  required: { value: true, message: SLUG_REQUIRED_MESSAGE },
                  pattern: { value: SLUG_REGEX, message: INVALID_SLUG_MESSAGE },
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
