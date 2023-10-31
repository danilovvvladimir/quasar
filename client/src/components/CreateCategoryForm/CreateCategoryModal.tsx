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
import { ProductDetails, ProductImage } from "@/types/product";
import {
  CATEGORY_CREATE_NOTIFY_MESSAGE,
  CATEGORY_MODAL_CREATE_MESSAGE,
  CATEGORY_MODAL_CREATE_NAME_LABEL_MESSAGE,
  CATEGORY_MODAL_CREATE_SLUG_LABEL_MESSAGE,
  CATEGORY_MODAL_CREATE_TITLE_MESSAGE,
  CATEGORY_NAME_REQUIRED_MESSAGE,
  CREATE_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  INVALID_SLUG_MESSAGE,
  SLUG_REQUIRED_MESSAGE,
} from "@/constants/messages";

interface CreateCategoryModalProps {}

interface ICreatingCategory
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}

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
      await categoryService.createCategory(values.name, values.slug);

      createNotify(CATEGORY_CREATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
      reset();
    } catch (error) {
      console.log(error);

      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  return (
    <div className={styles["create-category-modal"]}>
      <div className={styles["create-category-modal__header"]}>
        <h2 className={`title ${styles["create-category-modal__title"]}`}>
          {CATEGORY_MODAL_CREATE_TITLE_MESSAGE}
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
              <span>{CATEGORY_MODAL_CREATE_NAME_LABEL_MESSAGE}</span>
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
              <span>{CATEGORY_MODAL_CREATE_SLUG_LABEL_MESSAGE}</span>
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
            {CREATE_MESSAGE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryModal;
