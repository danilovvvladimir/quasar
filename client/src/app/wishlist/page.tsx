import { FC } from "react";
import styles from "./WishlistPage.module.scss";
import WishlistPageInner from "./WishlistPageInner";
import {
  WISHLIST_PAGE_METADATA_DESCRIPTION,
  WISHLIST_PAGE_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata = {
  title: WISHLIST_PAGE_METADATA_TITLE,
  description: WISHLIST_PAGE_METADATA_DESCRIPTION,
};

const WishlistPage: FC = () => {
  return (
    <section className={styles["wishlist"]}>
      <WishlistPageInner />
    </section>
  );
};

export default WishlistPage;
