"use client";

import { FC } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import Reviews from "@/components/Reviews/Reviews";
import SizeList from "@/components/SizeList/SizeList";
import GoHomeButton from "@/components/GoHomeButton/GoHomeButton";
import styles from "./SingleProductPage.module.scss";
import SingleProductAside from "@/components/SingleProductAside/SingleProductAside";
import classNames from "classnames";
import Modal from "@/components/UI/Modal/Modal";
import CreateReviewModalInner from "@/components/CreateReviewModalInner/CreateReviewModalInner";
import useSingleProductPageInner from "@/hooks/useSingleProductPageInner";

interface SingleProductPageInnerProps {
  slug: string;
  product: Product;
}

const SingleProductPageInner: FC<SingleProductPageInnerProps> = ({
  slug,
  product,
}) => {
  const {
    selectedImage,
    setSelectedImage,
    handleSelectDetails,
    selectedDetails,
    userHasSameProductSize,
    handleSendToCart,
    reviews,
    isModalVisible,
    setIsModalVisible,
    userHasProduct,
    userHasReview,
    existingReview,
  } = useSingleProductPageInner(product);

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
                {product.productImages.map((productImage) => (
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
            {product.description && (
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
            )}
          </div>

          <div className={styles["single-product__sizes"]}>
            <h2 className={`title ${styles["single-product__sizes-title"]}`}>
              Размеры
            </h2>
            <div className={styles["single-product__sizes-list"]}>
              <SizeList
                productDetails={product.productSizes.sort((a, b) => {
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

      <Reviews
        reviews={reviews}
        openCreateReviewModal={() => setIsModalVisible(true)}
        userHasProduct={userHasProduct}
        userHasReview={userHasReview}
      />
      {isModalVisible && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <CreateReviewModalInner
            productId={product.id}
            review={existingReview ? existingReview : undefined}
            closeModal={() => setIsModalVisible(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default SingleProductPageInner;
