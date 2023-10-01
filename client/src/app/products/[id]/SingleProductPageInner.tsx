"use client";

import { FC, useState } from "react";
import "./SingleProductPage.scss";
import Image from "next/image";
import { Product, ProductDetails } from "@/types/product";
import { Review } from "@/types/review";
import Reviews from "@/components/Reviews/Reviews";
import Button from "@/components/UI/Button/Button";
import SizeList from "@/components/SizeList/SizeList";
import OldPrice from "@/components/OldPrice/OldPrice";
import DiscountBadge from "@/components/DiscountBadge/DiscountBadge";
import { getDiscountPercent } from "@/utils/getDiscountPercent";
import ExtendedPrice from "@/components/ExtendedPrice/ExtendedPrice";
import CurrentPrice from "@/components/CurrentPrice/CurrentPrice";

interface SingleProductPageInnerProps {
  id: string;
}

const SingleProductPageInner: FC<SingleProductPageInnerProps> = ({ id }) => {
  const foundProduct: Product = {
    id: id,
    isVisible: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    currentPrice: 7499,
    oldPrice: 10900,
    name: "Nike Air Force 1 ‘07",
    slug: "nike-air-force-1-07",
    createdAt: new Date(),
    updatedAt: new Date(),
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

  const productDetails: ProductDetails[] = [
    { id: "1", quantity: 20, size: 41 },
    { id: "2", quantity: 2, size: 42 },
    { id: "3", quantity: 30, size: 43 },
    { id: "4", quantity: 5, size: 44 },
    { id: "5", quantity: 20, size: 45 },
    { id: "6", quantity: 2, size: 46 },
    { id: "7", quantity: 30, size: 47 },
    { id: "8", quantity: 5, size: 48 },
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
      <h1 className="title single-product__title">{foundProduct.name}</h1>
      <div className="single-product__wrapper">
        <div className="single-product__about">
          <div className="single-product__about-wrapper">
            <div className="single-product__gallery">
              <div className="single-product__gallery-list">
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={100}
                  height={100}
                />
              </div>
              <div className="single-product__gallery-main">
                <Image
                  className="single-product__gallery-item"
                  src="/product-image.jpg"
                  alt="product"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="single-product__description">
              <h2 className="title single-product__description-title">
                Описание
              </h2>
              <div className="single-product__description-text">
                {foundProduct.description}
              </div>
            </div>
          </div>

          <div className="single-product__sizes">
            <h2 className="title single-product__sizes-title">Размеры</h2>
            <div className="single-product__sizes-list">
              <SizeList
                productDetails={productDetails}
                handleSelectDetails={handleSelectDetails}
                selectedDetails={selectedDetails}
              />
            </div>
          </div>
        </div>
        <div className="single-product__aside-container">
          <div className="single-product__process">
            <div className="single-product__price">
              {foundProduct.oldPrice ? (
                <ExtendedPrice
                  currentPrice={foundProduct.currentPrice}
                  oldPrice={foundProduct.oldPrice}
                  discountPercent={getDiscountPercent(
                    foundProduct.oldPrice,
                    foundProduct.currentPrice,
                  )}
                />
              ) : (
                <CurrentPrice currentPrice={foundProduct.currentPrice} />
              )}
            </div>
            <Button
              className="single-product__cart-button"
              onClick={handleSendToCart}
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>

      <Reviews reviews={reviews} />
    </>
  );
};

export default SingleProductPageInner;
