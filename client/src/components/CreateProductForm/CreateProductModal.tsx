"use client";

import { FC, ChangeEvent } from "react";
import styles from "./CreateProductModal.module.scss";
import Separator from "../Separator/Separator";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Controller, useFormContext } from "react-hook-form";
import Toggler from "../UI/Toggler/Toggler";
import { ICreatingProduct, Product } from "@/types/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { slugRegex } from "@/constants/regex";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import DropZone from "../UI/DropZone/DropZone";
import ProductService from "@/services/product";
import SizeCreation from "../SizeCreation/SizeCreation";
import CategorySelect from "../CategorySelect/CategorySelect";
import { Category } from "@/types/category";

export interface CreateProductModalProps {
  categories: Category[];
}

const CreateProductModal: FC<CreateProductModalProps> = ({ categories }) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICreatingProduct>({ mode: "onChange" });

  const uploadImage = async (image: File) => {
    return await productService.uploadImage(image);
  };

  const productService = new ProductService();

  const onSubmit: SubmitHandler<ICreatingProduct> = async (values) => {
    try {
      console.log("values", values);
      const responses: string[] = [];

      for (let i = 0; i < values.images.length; i++) {
        const uploadedImage = await uploadImage(values.images[i]);
        responses.push(uploadedImage.filename);
      }
      console.log(responses);

      const data = await productService.create({
        name: values.name,
        currentPrice: +values.currentPrice,
        description: values.description,
        imagePaths: responses,
        slug: values.slug,
        details: values.details.map((item) => ({
          quantity: item.quantity,
          size: item.size,
        })),
        categoryIds: values.categoryIds,
      });

      console.log("data", data);

      createNotify("Товар успешно создан", notifyMode.SUCCESS);
      // reset();
    } catch (error) {
      console.log(error);

      createNotify("Something went wrong...", notifyMode.ERROR);
    }
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
                    required: {
                      value: true,
                      message: "Название обязательно к заполнению!",
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
                <span>Slug</span>
                <input
                  className="input"
                  {...register("slug", {
                    required: {
                      value: true,
                      message: "Slug обязателен к заполнению!",
                    },
                    pattern: { value: slugRegex, message: "Slug не валиден!" },
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
                      message: "Должна быть хотя бы одна категория!",
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
                      message: "Актуальная стоимость обязательна к заполнению!",
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
                  name="images"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: {
                      value: true,
                      message: "Изображения обязательны к заполнению!",
                    },
                  }}
                  render={({ field: { onChange, name, value } }) => (
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
                      message: "Размеры обязательны к заполнению!",
                    },
                  }}
                  render={({ field: { onChange, name, value } }) => (
                    // <DropZone name={name} onChange={onChange} />
                    <SizeCreation name={name} onChange={onChange} />
                  )}
                />
                {errors.details && (
                  <ErrorValidationText text={errors.details.message!} />
                )}
              </div>
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
