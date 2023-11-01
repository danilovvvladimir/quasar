import { FC } from "react";
import styles from "./WishlistPage.module.scss";
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
