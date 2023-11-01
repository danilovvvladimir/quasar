import { FC } from "react";
import styles from "./CartPage.module.scss";
import CartPageInner from "./CartPageInner";
import {
  CART_PAGE_METADATA_DESCRIPTION,
  CART_PAGE_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata = {
  title: CART_PAGE_METADATA_TITLE,
  description: CART_PAGE_METADATA_DESCRIPTION,
};

const CartPage: FC = () => {
  return (
    <section className={styles["cart"]}>
      <CartPageInner />
    </section>
  );
};

export default CartPage;
