import { FC } from "react";
import styles from "./ReviewsInfo.module.scss";
import { Review } from "@/types/review";
import { calculateRatingSummeries } from "@/utils/calculateRatingSummeries";
import ProgressBar from "../ProgressBar/ProgressBar";
import { calculateRatingSummeryPercent } from "@/utils/calculateRatingSummeryPercent";
import Rating from "../Rating/Rating";
import { calculateAverageRating } from "@/utils/calculateAverageRating";
import Separator from "../Separator/Separator";

interface ReviewsInfoProps {
  reviews: Review[];
}
const ReviewsInfo: FC<ReviewsInfoProps> = ({ reviews }) => {
  const ratingSummeryMap = calculateRatingSummeries(reviews);
  const totalRating = calculateAverageRating(reviews);

  const ratingItems = [5, 4, 3, 2, 1];

  return (
    <div className={styles["reviews-info"]}>
      <div className={styles["reviews-info__wrapper"]}>
        <div className={styles["reviews-info__total"]}>
          <Rating value={Math.round(totalRating)} type="large" />
          <div className={styles["reviews-info__total-extra"]}>
            {totalRating.toFixed(2)} / 5
          </div>
        </div>
        <Separator />
      </div>
      <div className={styles["reviews-info__rating"]}>
        {ratingItems.map((rating) => (
          <div className={styles["reviews-info__rating-item"]} key={rating}>
            <div className={styles["reviews-info__rating-item-title"]}>
              {rating} звезд
              {rating === 1 ? "а" : rating > 1 && rating < 5 ? "ы" : ""}
            </div>
            <ProgressBar
              currentPercent={calculateRatingSummeryPercent(
                reviews.length,
                ratingSummeryMap.get(rating)!,
              )}
            />
            <div className={styles["reviews-info__rating-item-quantity"]}>
              {ratingSummeryMap.get(rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsInfo;
