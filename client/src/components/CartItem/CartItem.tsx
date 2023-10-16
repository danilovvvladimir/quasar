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

interface CartItemProps {
  productCart: ProductCart;
  onSelectItem: (id: string) => void;
}

const CartItem: FC<CartItemProps> = ({ productCart, onSelectItem }) => {
  const {
    createdAt,
    currentPrice,
    description,
    id,
    name,
    oldPrice,
    productDetails,
    productImages,
    selectedDetails,
    slug,
    updatedAt,
    isSelected,
  } = productCart;

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
          src={productImages[0].imagePath}
          alt={name}
          width={100}
          height={100}
          className={styles["cart-item__product-image"]}
        ></Image>
        <div className={styles["cart-item__product-info"]}>
          <div className={styles["cart-item__product-name"]}>{name}</div>
          <div className={styles["cart-item__product-size"]}>
            Размер: {selectedDetails.size}
          </div>
          <div className={styles["cart-item__product-controls"]}>
            <span className={styles["cart-item__product-favorite"]}>
              В избранное
            </span>
            <span className={styles["cart-item__product-remove"]}>Удалить</span>
          </div>
        </div>
      </div>
      <div className={styles["cart-item__price"]}>
        <div className={styles["cart-item__current-price"]}>
          <CurrentPrice currentPrice={currentPrice} />
        </div>
        {oldPrice && (
          <div className={styles["cart-item__old-price"]}>
            <OldPrice oldPrice={oldPrice} />
            <DiscountBadge
              isInverted={true}
              discountPercent={getDiscountPercent(oldPrice, currentPrice)}
            />
          </div>
        )}
      </div>
      <div className={styles["cart-item__info"]}>
        <Stepper min={1} max={selectedDetails.quantity} />
        {/* Или счётчик до количества quantity этого продукта */}
        {/* Или товар закончился */}
        {/* Или размер закончился */}
      </div>
    </div>
  );
};

export default CartItem;
