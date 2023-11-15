import { FC } from "react";
import styles from "./ProfileSingleReview.module.scss";
import { Review } from "@/types/review";
import Button from "../UI/Button/Button";
import Image from "next/image";
import Rating from "../Rating/Rating";
import Link from "next/link";

interface ProfileSingleReviewProps {
  review: Review;
}

const ProfileSingleReview: FC<ProfileSingleReviewProps> = ({ review }) => {
  const { createdAt, rating, text, updatedAt } = review;

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
      </div>

      <div className={styles["profile-single-review__main"]}>
        <Link
          href={`/products/${review.product.slug}`}
          className={styles["profile-single-review__product"]}
        >
          <Image
            className={styles["profile-single-review__product-image"]}
            src={"/" + review.product.productImages[0].imagePath}
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
