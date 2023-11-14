"use client";

import { FC, useEffect, useState } from "react";
import styles from "./WishlistPage.module.scss";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import UserService from "@/services/user";
import { ProductWishlist } from "@/types/product";
import ProductMedium from "@/components/ProductMedium/ProductMedium";
import classNames from "classnames";

interface WishlistPageInnerProps {}

const WishlistPageInner: FC<WishlistPageInnerProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  const [wishlistItems, setwishlistItems] = useState<ProductWishlist[]>([]);

  const updateData = async () => {
    const products = await userService.getWishlistItems(user!.id);

    setwishlistItems(products);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div
        className={classNames(styles["wishlist__header"], {
          [styles["wishlist__header--centered"]]: wishlistItems.length == 0,
        })}
      >
        <GoHomeButton />
        <h1 className="title">Избранное</h1>
      </div>
      {wishlistItems.length > 0 ? (
        <div className={styles["wishlist__wrapper"]}>
          {wishlistItems.map((item) => (
            <ProductMedium key={item.product.id} product={item.product} />
          ))}
        </div>
      ) : (
        <div className={styles["wishlist__empty"]}>
          Вы ещё ничего не добавили в избранное :(
        </div>
      )}
    </>
  );
};

export default WishlistPageInner;
