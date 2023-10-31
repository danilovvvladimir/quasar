"use client";

import { FC } from "react";
import styles from "./CreateProductModal.module.scss";
import Separator from "../Separator/Separator";
import Button from "../UI/Button/Button";
import { Controller } from "react-hook-form";
import { ICreatingProduct } from "@/types/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { SLUG_REGEX } from "@/constants/regex";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import DropZone from "../UI/DropZone/DropZone";
import ProductService from "@/services/product";
import SizeCreation from "../SizeCreation/SizeCreation";
import CategorySelect from "../CategorySelect/CategorySelect";
import { Category } from "@/types/category";
import { createSlug } from "@/utils/createSlug";
import {
  CATEGORY_LABEL_MESSAGE,
  CATEGORY_LENGTH_MESSAGE,
  CREATE_MESSAGE,
  CREATE_SLUG_MESSAGE,
  CURRENT_PRICE_LABEL_MESSAGE,
  CURRENT_PRICE_REQUIRED_MESSAGE,
  DESCRIPTION_LABEL_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  IMAGES_LABEL_MESSAGE,
  IMAGES_REQUIRED_MESSAGE,
  INVALID_SLUG_MESSAGE,
  NAME_LABEL_MESSAGE,
  NAME_REQUIRED_MESSAGE,
  OLD_PRICE_LABEL_MESSAGE,
  PRODUCT_CREATE_NOTIFY_MESSAGE,
  PRODUCT_MODAL_CREATE_TITLE_MESSAGE,
  SIZED_LABEL_MESSAGE,
  SIZES_REQUIRED_MESSAGE,
  SLUG_LABEL_MESSAGE,
  SLUG_REQUIRED_MESSAGE,
} from "@/constants/messages";
import useCreateProductModal from "@/hooks/useCreateProductModal";

export interface CreateProductModalProps {
  categories: Category[];
  updateData(): void;
}

const CreateProductModal: FC<CreateProductModalProps> = ({
  categories,
  updateData,
}) => {
  const {
    getValues,
    handleCreateSlug,
    handleSubmit,
    onSubmit,
    register,
    errors,
    control,
  } = useCreateProductModal(updateData);

  return (
    <div className={styles["create-product-modal"]}>
      <div className={styles["create-product-modal__header"]}>
        <h2 className={`title ${styles["create-product-modal__title"]}`}>
          {PRODUCT_MODAL_CREATE_TITLE_MESSAGE}
        </h2>
        <Separator />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["create-product-modal__form"]}
      >
        <div className={styles["create-product-modal__content"]}>
          <div className={styles["create-product-modal__content-left"]}>
            <div className={styles["create-product-modal__name"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{NAME_LABEL_MESSAGE}</span>
                <input
                  className="input"
                  {...register("name", {
                    required: {
                      value: true,
                      message: NAME_REQUIRED_MESSAGE,
                    },
                  })}
                  type="text"
                />
                {errors.name && (
                  <ErrorValidationText text={errors.name.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__slug"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{SLUG_LABEL_MESSAGE}</span>
                <input
                  className="input"
                  {...register("slug", {
                    required: {
                      value: true,
                      message: SLUG_REQUIRED_MESSAGE,
                    },
                    pattern: {
                      value: SLUG_REGEX,
                      message: INVALID_SLUG_MESSAGE,
                    },
                  })}
                  type="text"
                />
                {errors.slug && (
                  <ErrorValidationText text={errors.slug.message!} />
                )}
                <Button
                  disabled={getValues("name") === ""}
                  type="button"
                  onClick={() => handleCreateSlug(getValues("name"))}
                >
                  {CREATE_SLUG_MESSAGE}
                </Button>
              </label>
            </div>
            <div className={styles["create-product-modal__description"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{DESCRIPTION_LABEL_MESSAGE}</span>
                <textarea className="textarea" {...register("description")} />
                {errors.description && (
                  <ErrorValidationText text={errors.description.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__categories"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{CATEGORY_LABEL_MESSAGE}</span>

                <Controller
                  name="categoryIds"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: {
                      value: true,
                      message: CATEGORY_LENGTH_MESSAGE,
                    },
                  }}
                  render={({ field: { onChange, name } }) => (
                    <CategorySelect
                      categories={categories}
                      name={name}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.categoryIds && (
                  <ErrorValidationText text={errors.categoryIds.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__categories"]}></div>
            <div className={styles["create-product-modal__current-price"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{CURRENT_PRICE_LABEL_MESSAGE}</span>
                <input
                  className="input"
                  {...register("currentPrice", {
                    required: {
                      value: true,
                      message: CURRENT_PRICE_REQUIRED_MESSAGE,
                    },
                  })}
                  type="number"
                />

                {errors.currentPrice && (
                  <ErrorValidationText text={errors.currentPrice.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__old-price"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>{OLD_PRICE_LABEL_MESSAGE}</span>
                <input
                  className="input"
                  {...register("oldPrice")}
                  type="number"
                />

                {errors.oldPrice && (
                  <ErrorValidationText text={errors.oldPrice.message!} />
                )}
              </label>
            </div>
          </div>
          <div className={styles["create-product-modal__content-right"]}>
            <div className={styles["create-product-modal__content-image"]}>
              <div className={styles["create-product-modal__label"]}>
                <span>{IMAGES_LABEL_MESSAGE}</span>
                <Controller
                  name="images"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: {
                      value: true,
                      message: IMAGES_REQUIRED_MESSAGE,
                    },
                  }}
                  render={({ field: { onChange, name } }) => (
                    <DropZone name={name} onChange={onChange} />
                  )}
                />
                {errors.images && (
                  <ErrorValidationText text={errors.images.message!} />
                )}
              </div>
            </div>
            <div className={styles["create-product-modal__content-sizes"]}>
              <div className={styles["create-product-modal__label"]}>
                <span>{SIZED_LABEL_MESSAGE}</span>
                <Controller
                  name="details"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: {
                      value: true,
                      message: SIZES_REQUIRED_MESSAGE,
                    },
                  }}
                  render={({ field: { onChange, name } }) => (
                    <SizeCreation name={name} onChange={onChange} />
                  )}
                />
                {errors.details && (
                  <ErrorValidationText text={errors.details.message!} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["create-product-modal__apply"]}>
          <Button
            type="submit"
            className={styles["create-product-modal__apply"]}
          >
            {CREATE_MESSAGE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductModal;
