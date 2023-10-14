"use client";

import { FC, useEffect, useState } from "react";
import styles from "./CreateCategoryForm.module.scss";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Separator from "../Separator/Separator";
import Toggler from "../UI/Toggler/Toggler";
import { Category } from "@/types/category";

interface CreateCategoryFormProps {}

// interface ICreatingCategory
//   extends Omit<Category, "id", "createdAt", "updatedAt"> {}

interface ICreatingCategory
  extends Omit<Category, "id" | "createdAt" | "updatedAt"> {}

const CreateCategoryForm: FC<CreateCategoryFormProps> = () => {
  const [creatingProduct, setCreatingProduct] = useState<ICreatingCategory>({
    isVisible: false,
    name: "",
    slug: "",
  });

  const toggleVisibility = () => {
    setCreatingProduct({
      ...creatingProduct,
      isVisible: !creatingProduct.isVisible,
    });
  };

  useEffect(() => {
    // return // clear form
  });

  return (
    <div className={styles["create-category-form"]}>
      <div className={styles["create-category-form__header"]}>
        <h2 className={`title ${styles["create-category-form__title"]}`}>
          Создание категории
        </h2>
        <Separator />
      </div>
      <div className={styles["create-category-form__content"]}>
        <div className={styles["create-category-form__name"]}>
          <label className={styles["create-category-form__label"]}>
            <h4
              className={`title ${styles["create-category-form__label-title"]}`}
            >
              Название
            </h4>
            <Input
              value={creatingProduct.name}
              onChange={(e) =>
                setCreatingProduct({ ...creatingProduct, name: e.target.value })
              }
              placeholder="Введите название..."
            />
          </label>
        </div>
        <div className={styles["create-category-form__slug"]}>
          <label className={styles["create-category-form__label"]}>
            <h4
              className={`title ${styles["create-category-form__label-title"]}`}
            >
              Slug
            </h4>
            <Input
              value={creatingProduct.slug}
              onChange={(e) =>
                setCreatingProduct({ ...creatingProduct, slug: e.target.value })
              }
              placeholder="Введите slug..."
            />
          </label>
          <Button>Сгенерировать</Button>
        </div>
        <div className={styles["create-category-form__visibility"]}>
          <label className={styles["create-category-form__label"]}>
            <h4
              className={`title ${styles["create-category-form__label-title"]}`}
            >
              Видимость
            </h4>
            <Toggler
              isToggle={creatingProduct.isVisible}
              onToggle={toggleVisibility}
            />
          </label>
        </div>
      </div>
      <div className={styles["create-category-form__apply"]}>
        <Button className={styles["create-category-form__create"]}>
          Создать
        </Button>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
