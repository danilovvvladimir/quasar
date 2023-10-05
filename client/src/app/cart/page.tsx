import { FC } from "react";
import styles from "./CartPage.module.scss";
import CartPageInner from "./CartPageInner";

export const metadata = {
  title: "QUASAR | Корзина",
  description: "Quasar Корзина",
};

const CartPage: FC = () => {
  return (
    <section className={styles["cart"]}>
      <CartPageInner />
    </section>
  );
};

export default CartPage;
