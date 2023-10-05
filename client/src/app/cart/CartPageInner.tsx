"use client";

import { FC } from "react";
import Button from "@/components/UI/Button/Button";
import styles from "./CartPage.module.scss";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import CheckBoxWithLabel from "@/components/UI/CheckBoxWithLabel/CheckBoxWithLabel";

const CartPageInner: FC = () => {
  return (
    <>
      <div className={styles["cart__header"]}>
        <GoHomeButton />
        <h1 className="title">Корзина</h1>
      </div>
      <div className={styles["cart__wrapper"]}>
        <div className={styles["cart__info"]}>
          <div className={styles["cart__selection"]}>
            {/* выбрать все */}
            <CheckBoxWithLabel
              labelText={"Выбрать все"}
              labelClassName={styles["cart__selection-all"]}
            />
            {/* Снять выделение */}
            <span className={styles["cart__selection-clear"]}>
              Снять выделение
            </span>
          </div>
          <div className={styles["cart__items"]}>
            {/* cart item */}
            {/* cart item */}
            {/* cart item */}
          </div>
        </div>

        <div className={styles["cart__processing"]}>
          <div className={styles["cart__processing-info"]}>
            <div className={styles["cart__processing-count"]}>Всего:</div>
            <div className={styles["cart__processing-sales"]}>Скидки: </div>
            <div className={styles["cart__processing-total"]}>Итого</div>
          </div>
          <Button>Оплатить</Button>
        </div>
      </div>
    </>
  );
};

export default CartPageInner;
