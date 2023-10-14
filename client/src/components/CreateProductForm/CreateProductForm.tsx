import { FC } from "react";
import styles from "./CreateProductForm.module.scss";
import Separator from "../Separator/Separator";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Toggler from "../UI/Toggler/Toggler";

interface CreateProductFormProps {}

const CreateProductForm: FC<CreateProductFormProps> = () => {
  return (
    <div className={styles["create-product-form"]}>
      <div className={styles["create-product-form__header"]}>
        <h2 className={`title ${styles["create-product-form__title"]}`}>
          Создание продукта
        </h2>
      </div>
      {/* <Separator /> */}
      <div className={styles["create-product-form__content"]}>
        <div className={styles["create-product-form__content-left"]}>
          <div className={styles["create-product-form__name"]}>
            <label className={styles["create-product-form__label"]}>
              <span>Название</span>
              <Input placeholder="Введите название..." />
            </label>
          </div>
          <div className={styles["create-product-form__slug"]}>
            <label className={styles["create-product-form__label"]}>
              <span>Slug</span>
              <Input placeholder="Введите slug..." />
            </label>
            <Button>Сгенерировать</Button>
          </div>
          <div className={styles["create-product-form__description"]}>
            <label className={styles["create-product-form__label"]}>
              <span>Описание</span>
              <textarea></textarea>
            </label>
          </div>
          <div className={styles["create-product-form__categories"]}></div>
          <div className={styles["create-product-form__current-price"]}>
            <label className={styles["create-product-form__label"]}>
              <span>Актуальная стоимость</span>
              <Input placeholder="Введите актуальную стоимость..." />
            </label>
          </div>
          <div className={styles["create-product-form__old-price"]}>
            <label className={styles["create-product-form__label"]}>
              <span>Старая стоимость</span>
              <Input placeholder="Введите старую стоимость..." />
            </label>
          </div>
          <div className={styles["create-product-form__visibility"]}>
            <Toggler />
          </div>
        </div>
        <div className={styles["create-product-form__content-right"]}>
          <div className={styles["create-product-form__content-image"]}></div>
          <div className={styles["create-product-form__content-sizes"]}>
            {/* <div className={styles["create-product-form__content-sizes"]}></div> */}
          </div>
        </div>
      </div>
      {/* <Separator /> */}
      <div className={styles["create-product-form__apply"]}>
        <Button className={styles["create-product-form__apply"]}>
          Создать
        </Button>
      </div>
    </div>
  );
};

export default CreateProductForm;
