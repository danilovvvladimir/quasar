import { FC } from "react";
import styles from "./WishlistPage.module.scss";
import ProductMedium from "@/components/Product/ProductMedium/ProductMedium";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import WishlistPageInner from "./WishlistPageInner";

export const metadata = {
  title: "QUASAR | Избранное",
  description: "Quasar Избранное",
};

const WishlistPage: FC = () => {
  return (
    <section className={styles["wishlist"]}>
      <WishlistPageInner />
    </section>
  );
};

export default WishlistPage;
