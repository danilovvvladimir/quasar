"use client";

import { FC, useEffect, useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import CustomLink from "@/components/CustomLink/CustomLink";
import Favorite from "@/components/Favorite/Favorite";
import styles from "./ProductMedium.module.scss";
import OldPrice from "@/components/OldPrice/OldPrice";
import DiscountBadge from "@/components/DiscountBadge/DiscountBadge";
import { getDiscountPercent } from "@/utils/getDiscountPercent";
import { calculateAverageRating } from "@/utils/calculateAverageRating";
import { getFitProductName } from "@/utils/getFitProductName";
import CurrentPrice from "@/components/CurrentPrice/CurrentPrice";
import UserService from "@/services/user";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/store/auth/auth.actions";

interface ProductMediumProps {
  product: Product;
}

// TODO
const ProductMedium: FC<ProductMediumProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();

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
    review: reviews,
  } = product;

  const onToggleFavorite = async () => {
    const userService = new UserService();

    await userService.toggleWishlistItem(user.id, id);

    await dispatch(checkAuth());
  };

  const checkIsFavorite = () => {
    if (user && user.wishlistItem.find((item) => item.productId === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkIsFavorite();
  }, [user]);

  return (
    <div className={styles["product-medium"]}>
      <div className={styles["product-medium__image-box"]}>
        <Link href={`products/${slug}`}>
          <Image
            className={styles["product-medium__image"]}
            src={"/" + productImages[0].imagePath}
            alt={name}
            width={200}
            height={200}
          />
        </Link>
        {user && (
          <Favorite
            isActivated={isFavorite}
            className={styles["product-medium__favorite"]}
            onClick={onToggleFavorite}
          />
        )}
      </div>
      <div className={styles["product-medium__info"]}>
        <Link href="products/1">
          <h3 className={`title ${styles["product-medium__title"]}`}>
            {getFitProductName(name)}
          </h3>
        </Link>
        <span className={styles["product-medium__price"]}>
          <div className={styles["product-medium__price-current"]}>
            <CurrentPrice currentPrice={currentPrice} />
          </div>
          {oldPrice > 0 && (
            <>
              <OldPrice oldPrice={oldPrice} />
              <DiscountBadge
                isInverted
                discountPercent={getDiscountPercent(oldPrice, currentPrice)}
              />
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

            {calculateAverageRating(reviews).toFixed(2)}
          </div>
          <div className={styles["product-medium__reviews"]}>
            {" "}
            / {reviews.length} отзыва
          </div>
        </div>
      </div>
      <CustomLink
        className={styles["product-medium__link"]}
        href={`products/${slug}`}
        isButton={true}
      >
        Перейти
      </CustomLink>
    </div>
  );
};

export default ProductMedium;
