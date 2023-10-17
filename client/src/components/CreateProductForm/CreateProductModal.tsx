"use client";

import { FC, ChangeEvent } from "react";
import styles from "./CreateProductModal.module.scss";
import Separator from "../Separator/Separator";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Controller, useFormContext } from "react-hook-form";
import Toggler from "../UI/Toggler/Toggler";
import { Product } from "@/types/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { slugRegex } from "@/constants/regex";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import DropZone from "../UI/DropZone/DropZone";

interface CreateProductModalProps {}

interface ICreatingProduct
  extends Omit<Product, "id" | "createdAt" | "updatedAt"> {}

const CreateProductModal: FC<CreateProductModalProps> = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreatingProduct>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ICreatingProduct> = async (values) => {
    try {
      console.log(values);

      createNotify("Товар успешно создан", notifyMode.SUCCESS);
      // reset();
    } catch (error) {
      console.log(error);

      createNotify("Something went wrong...", notifyMode.ERROR);
    }
  };

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onImagesChange", e);
  };

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
                    required: { value: true, message: "Name is required" },
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
            <div className={styles["create-product-modal__description"]}>
              <label className={styles["create-product-modal__label"]}>
                <span>Описание</span>
                {/* <textarea></textarea> */}

                <textarea className="textarea" {...register("description")} />
                {errors.description && (
                  <ErrorValidationText text={errors.description.message!} />
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
                      message: "CurrentPrice is required",
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
                <span>Старая стоимость</span>
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
                <span>Изображения</span>
                <Controller
                  name="productImages"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({ field: { onChange, name } }) => (
                    <DropZone name={name} />
                  )}
                />
                {errors.productImages && (
                  <ErrorValidationText text={errors.productImages.message!} />
                )}
              </div>
            </div>
            <div className={styles["create-product-modal__content-sizes"]}>
              size
              {/* <div className={styles["create-product-modal__content-sizes"]}></div> */}
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
