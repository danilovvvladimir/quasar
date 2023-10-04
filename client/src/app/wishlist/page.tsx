import { FC } from "react";
import styles from "./WishlistPage.module.scss";
import ProductMedium from "@/components/Product/ProductMedium/ProductMedium";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
// {styles[]}
const WishlistPage: FC = () => {
  return (
    <section className={styles["wishlist"]}>
      <div className={styles["wishlist__header"]}>
        <GoHomeButton />
        <h1 className="title">Избранное</h1>
      </div>
      <div className={styles["wishlist__wrapper"]}>
        {/* map по products в wishlist у current user */}
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
        <ProductMedium />
      </div>
    </section>
  );
};

export default WishlistPage;
