"use client";

import { FC } from "react";
import styles from "./CartItem.module.scss";
import { ProductCart } from "@/types/product";
import Checkbox from "../UI/Checkbox/Checkbox";
import Image from "next/image";
import OldPrice from "../OldPrice/OldPrice";
import DiscountBadge from "../DiscountBadge/DiscountBadge";
import { getDiscountPercent } from "@/utils/getDiscountPercent";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import Stepper from "../UI/Stepper/Stepper";
import UserService from "@/services/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { checkAuth } from "@/store/auth/auth.actions";

interface CartItemProps {
  productCart: ProductCart;
  onSelectItem: (id: string) => void;
  updateData: () => void;
}

const CartItem: FC<CartItemProps> = ({
  productCart,
  onSelectItem,
  updateData,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { id, isSelected, product, productId, quantity, size } = productCart;

  const { currentPrice, name, oldPrice, productImages } = product;

  const onRemoveFromCart = async () => {
    const userService = new UserService();

    await userService.deleteCartItem(id);
    updateData();
    dispatch(checkAuth());
  };

  return (
    <div className={styles["cart-item"]}>
      <div
        className={styles["cart-item__checkbox"]}
        onClick={() => onSelectItem(id)}
      >
        <Checkbox checked={isSelected} />
      </div>
      <div className={styles["cart-item__product"]}>
        <Image
          src={"/" + productImages[0].imagePath}
          alt={name}
          width={100}
          height={100}
          className={styles["cart-item__product-image"]}
        ></Image>
        <div className={styles["cart-item__product-info"]}>
          <div className={styles["cart-item__product-name"]}>{name}</div>
          <div className={styles["cart-item__product-size"]}>
            Размер: {size}
          </div>
          <div className={styles["cart-item__product-controls"]}>
            <span className={styles["cart-item__product-favorite"]}>
              В избранное
            </span>
            <span
              className={styles["cart-item__product-remove"]}
              onClick={onRemoveFromCart}
            >
              Удалить
            </span>
          </div>
        </div>
      </div>
      <div className={styles["cart-item__price"]}>
        <div className={styles["cart-item__current-price"]}>
          <CurrentPrice currentPrice={currentPrice} />
        </div>
        {oldPrice > 0 && (
          <div className={styles["cart-item__old-price"]}>
            <OldPrice oldPrice={oldPrice} />
            <DiscountBadge
              isInverted={true}
              discountPercent={getDiscountPercent(oldPrice, currentPrice)}
            />
          </div>
        )}
      </div>
      {/* <div className={styles["cart-item__info"]}>
        <Stepper min={1} max={quantity} />
      </div> */}
    </div>
  );
};

export default CartItem;
