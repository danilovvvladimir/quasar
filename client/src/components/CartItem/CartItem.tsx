import { FC } from "react";
import styles from "./CartItem.module.scss";

interface CartItemProps {}

const CartItem: FC<CartItemProps> = () => {
  return (
    <div className={styles["cart-item"]}>
      <div className={styles["cart-item__checkbox"]}></div>
      <div className={styles["cart-item__item"]}></div>
      <div className={styles["cart-item__price"]}></div>
      <div className={styles["cart-item__info"]}></div>
    </div>
  );
};

export default CartItem;
