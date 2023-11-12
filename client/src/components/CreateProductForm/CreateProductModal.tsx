"use client";

import { FC } from "react";
import styles from "./CreateProductModal.module.scss";
import Separator from "../Separator/Separator";
import Button from "../UI/Button/Button";
import { Controller } from "react-hook-form";
import { SLUG_REGEX } from "@/constants/regex";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import DropZone from "../UI/DropZone/DropZone";
import SizeCreation from "../SizeCreation/SizeCreation";
import CategorySelect from "../CategorySelect/CategorySelect";
import { Category } from "@/types/category";
import useCreateProductModal from "@/hooks/useCreateProductModal";
import {
  NAME_REQUIRED_MESSAGE,
  SLUG_REQUIRED_MESSAGE,
  INVALID_SLUG_MESSAGE,
  CATEGORY_LENGTH_MESSAGE,
  CURRENT_PRICE_REQUIRED_MESSAGE,
  IMAGES_REQUIRED_MESSAGE,
  SIZES_REQUIRED_MESSAGE,
} from "@/constants/validation";
import { Product } from "@/types/product";

export interface CreateProductModalProps {
  categories: Category[];
  updateData(): void;
  product?: Product;
}

const CreateProductModal: FC<CreateProductModalProps> = ({
  categories,
  updateData,
  product,
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

  console.log("CreateProductModal Product", product);

  return (
    <div className={styles["create-product-modal"]}>
      <div className={styles["create-product-modal__header"]}>
        <h2 className={`title ${styles["create-product-modal__title"]}`}>
          Создание продукта
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
                <span>Название</span>
                <input
                  className="input"
                  {...register("name", {
                    required: {
                      value: true,
                      message: NAME_REQUIRED_MESSAGE,
                    },
                  })}
                  defaultValue={product ? product.name : ""}
                  type="text"
                />
                {errors.name && (
                  <ErrorValidationText text={errors.name.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__slug"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>Slug</span>
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
                  defaultValue={product ? product.slug : ""}
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
                  Создать Slug
                </Button>
              </label>
            </div>
            <div className={styles["create-product-modal__description"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>Описание</span>
                <textarea
                  className="textarea"
                  defaultValue={product ? product.description : ""}
                  {...register("description")}
                />
                {errors.description && (
                  <ErrorValidationText text={errors.description.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__categories"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>Категории</span>

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
                <span>Актуальная стоимость</span>
                <input
                  className="input"
                  {...register("currentPrice", {
                    required: {
                      value: true,
                      message: CURRENT_PRICE_REQUIRED_MESSAGE,
                    },
                  })}
                  defaultValue={product ? product.currentPrice : ""}
                  type="number"
                />

                {errors.currentPrice && (
                  <ErrorValidationText text={errors.currentPrice.message!} />
                )}
              </label>
            </div>
            <div className={styles["create-product-modal__old-price"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>Старая стоимость</span>
                <input
                  className="input"
                  {...register("oldPrice")}
                  defaultValue={product ? product.oldPrice : ""}
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
                <span>Изображения</span>
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
                <span>Размеры</span>
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
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductModal;
