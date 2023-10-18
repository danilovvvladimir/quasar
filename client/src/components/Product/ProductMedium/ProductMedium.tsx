"use client";

import { FC } from "react";
import { Product } from "@/types/product";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import Link from "next/link";
import CustomLink from "@/components/CustomLink/CustomLink";
import Favorite from "@/components/Favorite/Favorite";
import styles from "./ProductMedium.module.scss";
import OldPrice from "@/components/OldPrice/OldPrice";
import DiscountBadge from "@/components/DiscountBadge/DiscountBadge";
import { getDiscountPercent } from "@/utils/getDiscountPercent";

interface ProductMediumProps {
  product: Product;
}

const ProductMedium: FC<ProductMediumProps> = ({ product }) => {
  const {
    createdAt,
    currentPrice,
    description,
    id,
    name,
    oldPrice,
    productDetails,
    productImage: productImages,
    slug,
    updatedAt,
  } = product;

  console.log("product images", productImages[0].imagePath);

  return (
    <div className={styles["product-medium"]}>
      <div className={styles["product-medium__image"]}>
        <Link href="products/1">
          <Image
            // src="/product-image.jpg"
            src={"/" + productImages[0].imagePath}
            alt={"/" + productImages[0].imagePath}
            width={200}
            height={200}
          />
        </Link>
        <Favorite
          isActivated={true}
          className={styles["product-medium__favorite"]}
        />
      </div>
      <div className={styles["product-medium__info"]}>
        <Link href="products/1">
          <h3 className={`title ${styles["product-medium__title"]}`}>
            Nike Air Force 1 &apos;07 Nike Airffs...
            {name}
          </h3>
        </Link>
        <span className={styles["product-medium__price"]}>
          <div className={styles["product-medium__price-current"]}>
            {currentPrice} ₽
          </div>
          {oldPrice && (
            <>
              {/* <div className={styles["product-medium__price-old"]}>
                10 900 ₽
              </div> */}
              <OldPrice oldPrice={oldPrice} />
              <DiscountBadge
                discountPercent={getDiscountPercent(oldPrice, currentPrice)}
              />
              {/* <div className={styles["product-medium__price-discount"]}>
                -29%
              </div> */}
            </>
          )}
        </span>
        <div className={styles["product-medium__about"]}>
          <div className={styles["product-medium__rating"]}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4829 5.38024L10.6864 4.68315L8.54222 0.336271C8.48365 0.217256 8.38731 0.120911 8.26829 0.0623481C7.96981 -0.0850036 7.6071 0.0377895 7.45786 0.336271L5.3137 4.68315L0.517213 5.38024C0.384974 5.39913 0.26407 5.46147 0.171503 5.55592C0.0595945 5.67095 -0.0020722 5.82569 5.31712e-05 5.98616C0.00217854 6.14662 0.0679221 6.29968 0.182838 6.4117L3.65316 9.79512L2.83328 14.5727C2.81405 14.6839 2.82635 14.7982 2.86878 14.9027C2.91121 15.0072 2.98207 15.0977 3.07333 15.164C3.16459 15.2302 3.27259 15.2696 3.38509 15.2777C3.4976 15.2857 3.6101 15.262 3.70983 15.2094L8.00004 12.9537L12.2902 15.2094C12.4074 15.2717 12.5434 15.2925 12.6737 15.2698C13.0024 15.2131 13.2235 14.9014 13.1668 14.5727L12.3469 9.79512L15.8172 6.4117C15.9117 6.31913 15.974 6.19823 15.9929 6.06599C16.0439 5.73539 15.8135 5.42935 15.4829 5.38024Z"
                fill="#FFA800"
              />
            </svg>
            4.7
          </div>
          <div className={styles["product-medium__reviews"]}>
            {" "}
            / 4893 отзыва
          </div>
        </div>
      </div>
      <CustomLink
        className={styles["product-medium__link"]}
        href="products/1"
        isButton={true}
      >
        Перейти
      </CustomLink>
    </div>
  );
};

export default ProductMedium;
