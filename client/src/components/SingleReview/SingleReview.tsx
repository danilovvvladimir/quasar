import { FC } from "react";
import styles from "./SingleReview.module.scss";
import { Review } from "@/types/review";
import Rating from "../Rating/Rating";

interface SingleReviewProps extends Review {}

const SingleReview: FC<SingleReviewProps> = ({
  createdAt,
  rating,
  text,
  updatedAt,
  user,
}) => {
  return (
    <div className={styles["single-review"]}>
      <div className={styles["single-review__wrapper"]}>
        <div className={styles["single-review__info"]}>
          <div className={styles["single-review__details"]}>
            <div className={styles["single-review__username"]}>
              {user.username}
            </div>
            <div className={styles["single-review__date"]}>
              / {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className={styles["single-review__rating"]}>
            <Rating value={rating} />
          </div>
        </div>
        <div className={styles["single-review__text"]}>{text}</div>
      </div>
    </div>
  );
};

export default SingleReview;
