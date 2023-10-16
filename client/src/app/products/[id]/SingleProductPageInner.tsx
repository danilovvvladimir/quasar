"use client";

import { FC, useState } from "react";
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

interface SingleProductPageInnerProps {
  id: string;
}

const SingleProductPageInner: FC<SingleProductPageInnerProps> = ({ id }) => {
  const foundProduct: Product = {
    id: id,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    currentPrice: 7499,
    oldPrice: 10900,
    name: "Nike Air Force 1 ‘07",
    slug: "nike-air-force-1-07",
    createdAt: new Date(),
    updatedAt: new Date(),
    productDetails: [
      { id: "1", quantity: 20, size: 41, productId: id },
      { id: "2", quantity: 0, size: 42, productId: id },
      { id: "3", quantity: 30, size: 43, productId: id },
      { id: "4", quantity: 5, size: 44, productId: id },
      { id: "5", quantity: 20, size: 45, productId: id },
      { id: "6", quantity: 2, size: 46, productId: id },
      { id: "7", quantity: 30, size: 47, productId: id },
      { id: "8", quantity: 5, size: 48, productId: id },
    ],
    productImages: [
      { id: "1", imagePath: "/product-image.jpg", productId: id },
      { id: "2", imagePath: "/product-image.jpg", productId: id },
      { id: "3", imagePath: "/product-image.jpg", productId: id },
      { id: "4", imagePath: "/product-image.jpg", productId: id },
    ],
  };

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

  const handleSendToCart = () => {
    if (selectedDetails === null) {
      console.log("Не выбран размер");

      return;
    }

    console.log("*Добавление в корзину*");
  };

  return (
    <>
      <div className={styles["single-product__header"]}>
        <GoHomeButton />
        <h1 className={`title ${styles["single-product__title"]}`}>
          {foundProduct.name}
        </h1>
      </div>
      <div className={styles["single-product__wrapper"]}>
        <div className={styles["single-product__about"]}>
          <div className={styles["single-product__about-wrapper"]}>
            <div className={styles["single-product__gallery"]}>
              <div className={styles["single-product__gallery-list"]}>
                {foundProduct.productImages.map((productImage) => (
                  <Image
                    key={productImage.id}
                    className={styles["single-product__gallery-item"]}
                    src={productImage.imagePath}
                    alt="product"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
              <div className={styles["single-product__gallery-main"]}>
                <Image
                  className={styles["single-product__gallery-item"]}
                  src="/product-image.jpg"
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
                {foundProduct.description}
              </div>
            </div>
          </div>

          <div className={styles["single-product__sizes"]}>
            <h2 className={`title ${styles["single-product__sizes-title"]}`}>
              Размеры
            </h2>
            <div className={styles["single-product__sizes-list"]}>
              <SizeList
                productDetails={foundProduct.productDetails}
                handleSelectDetails={handleSelectDetails}
                selectedDetails={selectedDetails}
              />
            </div>
          </div>
        </div>
        <SingleProductAside
          isDisabled={selectedDetails?.quantity === 0}
          currentPrice={foundProduct.currentPrice}
          oldPrice={foundProduct.oldPrice}
          handleSendToCart={handleSendToCart}
        />
      </div>

      <Reviews reviews={reviews} />
    </>
  );
};

export default SingleProductPageInner;
