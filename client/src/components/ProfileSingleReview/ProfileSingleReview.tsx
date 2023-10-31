import { FC } from "react";
import styles from "./ProfileSingleReview.module.scss";
import { Review } from "@/types/review";
import Button from "../UI/Button/Button";
import Image from "next/image";
import { Product } from "@/types/product";
import Rating from "../Rating/Rating";
import Link from "next/link";

interface ProfileSingleReviewProps {
  review: Review;
}

const ProfileSingleReview: FC<ProfileSingleReviewProps> = ({ review }) => {
  const { createdAt, id, productId, rating, text, updatedAt, user } = review;

  // const product: Product = {
  //   id: id,
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  //   currentPrice: 7499,
  //   oldPrice: 10900,
  //   name: "Nike Air Force 1 ‘07",
  //   slug: "nike-air-force-1-07",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   productDetails: [
  //     { id: "1", quantity: 20, size: 41, productId: id },
  //     { id: "2", quantity: 0, size: 42, productId: id },
  //     { id: "3", quantity: 30, size: 43, productId: id },
  //     { id: "4", quantity: 5, size: 44, productId: id },
  //     { id: "5", quantity: 20, size: 45, productId: id },
  //     { id: "6", quantity: 2, size: 46, productId: id },
  //     { id: "7", quantity: 30, size: 47, productId: id },
  //     { id: "8", quantity: 5, size: 48, productId: id },
  //   ],
  //   productImages: [
  //     { id: "1", imagePath: "/product-image.jpg", productId: id },
  //     { id: "2", imagePath: "/product-image.jpg", productId: id },
  //     { id: "3", imagePath: "/product-image.jpg", productId: id },
  //     { id: "4", imagePath: "/product-image.jpg", productId: id },
  //   ],
  // };

  return (
    <div className={styles["profile-single-review"]}>
      <div className={styles["profile-single-review__header"]}>
        <div className={styles["profile-single-review__header-info"]}>
          <span className={`title ${styles["profile-single-review__title"]}`}>
            Отзыв от {new Date(createdAt).toLocaleDateString()}
          </span>

          {createdAt.toString() !== updatedAt.toString() && (
            <span className={styles["profile-single-review__updated"]}>
              (Последний раз редактирован{" "}
              {new Date(updatedAt).toLocaleDateString()})
            </span>
          )}
        </div>
        <Button className={styles["profile-single-review__button-edit"]}>
          Редактировать
        </Button>
      </div>

      <div className={styles["profile-single-review__main"]}>
        <Link
          href={`/products/${review.product.slug}`}
          className={styles["profile-single-review__product"]}
        >
          <Image
            className={styles["profile-single-review__product-image"]}
            src={"/" + review.product.productImage[0].imagePath}
            alt={review.product.name}
            width={75}
            height={75}
          />
          <div className={styles["profile-single-review__info"]}>
            <div className={styles["profile-single-review__product-title"]}>
              {review.product.name}
            </div>
            <div className={styles["profile-single-review__text"]}>{text}</div>
          </div>
        </Link>
        <div className={styles["profile-single-review__rating"]}>
          <Rating value={rating} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSingleReview;
