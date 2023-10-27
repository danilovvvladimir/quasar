"use client";

import { FC, useEffect, useState } from "react";
import styles from "./WishlistPage.module.scss";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import ProductMedium from "@/components/Product/ProductMedium/ProductMedium";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UserService from "@/services/user";
import { ProductWishlist } from "@/types/product";

interface WishlistPageInnerProps {}

const WishlistPageInner: FC<WishlistPageInnerProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  const [wishlistItems, setwishlistItems] = useState<ProductWishlist[]>([]);

  const updateData = async () => {
    const products = await userService.getWishlistItems(user.id);

    console.log("wishlistItems", products);

    setwishlistItems(products);
    // setwishlistItems(newwishlistItems);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div className={styles["wishlist__header"]}>
        <GoHomeButton />
        <h1 className="title">Избранное</h1>
      </div>
      <div className={styles["wishlist__wrapper"]}>
        {/* map по products в wishlist у current user */}
        {wishlistItems.map((item) => (
          <ProductMedium key={item.product.id} product={item.product} />
        ))}
      </div>
    </>
  );
};

export default WishlistPageInner;
