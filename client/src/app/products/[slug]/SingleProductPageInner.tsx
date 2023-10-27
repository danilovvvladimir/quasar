"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Product, ProductDetails } from "@/types/product";
import { Review } from "@/types/review";
import Reviews from "@/components/Reviews/Reviews";
import Button from "@/components/UI/Button/Button";
import SizeList from "@/components/SizeList/SizeList";
import { getDiscountPercent } from "@/utils/getDiscountPercent";
import ExtendedPrice from "@/components/ExtendedPrice/ExtendedPrice";
import CurrentPrice from "@/components/CurrentPrice/CurrentPrice";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import styles from "./SingleProductPage.module.scss";
import SingleProductAside from "@/components/SingleProductAside/SingleProductAside";
import ProductService from "@/services/product";
import classNames from "classnames";
import { createNotify, notifyMode } from "@/utils/createNotify";
import UserService from "@/services/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { checkAuth } from "@/store/auth/auth.actions";

interface SingleProductPageInnerProps {
  slug: string;
  product: Product;
}

const SingleProductPageInner: FC<SingleProductPageInnerProps> = ({
  slug,
  product,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const userService = new UserService();

  const [selectedImage, setSelectedImage] = useState<string>(
    product.productImage[0].imagePath,
  );

  const reviews: Review[] = [
    {
      id: "1",
      createdAt: new Date(),
      productId: "1",
      rating: 4,
      text: "good",
      updatedAt: new Date(),
      user: { id: "1", username: "megahypergava" },
    },
    {
      id: "2",
      createdAt: new Date(),
      productId: "1",
      rating: 3,
      text: "good not good",
      updatedAt: new Date(),
      user: { id: "2", username: "yousmellliketeens" },
    },
  ];

  const [selectedDetails, setSelectedDetails] = useState<ProductDetails | null>(
    null,
  );

  const handleSelectDetails = (newSelectedDetails: ProductDetails) => {
    if (newSelectedDetails.id === selectedDetails?.id) {
      setSelectedDetails(null);
    } else {
      setSelectedDetails(newSelectedDetails);
    }
  };

  const userHasSameProductSize = () => {
    const userHasProduct = user.cartItem.find(
      (item) => item.productId === product.id,
    );

    if (userHasProduct && userHasProduct.size === selectedDetails?.size) {
      createNotify("У вас уже есть этот товар в корзине", notifyMode.ERROR);
      return true;
    }

    return false;
  };

  const handleSendToCart = async () => {
    if (selectedDetails === null) {
      createNotify("Размер не выбран!", notifyMode.ERROR);
      return;
    }

    try {
      await userService.createCartItem({
        productId: product.id,
        quantity: 1,
        size: selectedDetails.size,
        userId: user.id,
      });

      setSelectedDetails(null);

      dispatch(checkAuth());
      createNotify("Успешно добавлен в корзину", notifyMode.SUCCESS);
    } catch (error) {
      createNotify("Что-то пошло не так!", notifyMode.ERROR);
    }
  };

  return (
    <>
      <div className={styles["single-product__header"]}>
        <GoHomeButton />
        <h1 className={`title ${styles["single-product__title"]}`}>
          {product.name}
        </h1>
      </div>
      <div className={styles["single-product__wrapper"]}>
        <div className={styles["single-product__about"]}>
          <div className={styles["single-product__about-wrapper"]}>
            <div className={styles["single-product__gallery"]}>
              <div className={styles["single-product__gallery-list"]}>
                {product.productImage.map((productImage) => (
                  <Image
                    key={productImage.id}
                    className={classNames(
                      styles["single-product__gallery-item"],
                      {
                        [styles["single-product__gallery-item--selected"]]:
                          productImage.imagePath === selectedImage,
                      },
                    )}
                    src={"/" + productImage.imagePath}
                    alt="product"
                    width={100}
                    height={100}
                    onClick={() => setSelectedImage(productImage.imagePath)}
                  />
                ))}
              </div>
              <div className={styles["single-product__gallery-main"]}>
                <Image
                  className={styles["single-product__gallery-item"]}
                  src={"/" + selectedImage}
                  alt="product"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className={styles["single-product__description"]}>
              <h2
                className={`title ${styles["single-product__description-title"]}`}
              >
                Описание
              </h2>
              <div className={styles["single-product__description-text"]}>
                {product.description}
              </div>
            </div>
          </div>

          <div className={styles["single-product__sizes"]}>
            <h2 className={`title ${styles["single-product__sizes-title"]}`}>
              Размеры
            </h2>
            <div className={styles["single-product__sizes-list"]}>
              <SizeList
                productDetails={product.productSize.sort((a, b) => {
                  if (a.size < b.size) {
                    return -1;
                  }
                  if (a.size > b.size) {
                    return 1;
                  }
                  return 0;
                })}
                handleSelectDetails={handleSelectDetails}
                selectedDetails={selectedDetails}
              />
            </div>
          </div>
        </div>
        <SingleProductAside
          isDisabled={
            selectedDetails?.quantity === 0 || userHasSameProductSize()
          }
          currentPrice={product.currentPrice}
          oldPrice={product.oldPrice}
          handleSendToCart={handleSendToCart}
        />
      </div>

      <Reviews reviews={reviews} />
    </>
  );
};

export default SingleProductPageInner;
