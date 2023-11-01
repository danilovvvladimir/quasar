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
// TODO rating
const ReviewsInfo: FC<ReviewsInfoProps> = ({ reviews }) => {
  const ratingSummeryMap = calculateRatingSummeries(reviews);
  const totalRating = calculateAverageRating(reviews);

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
        <div className={styles["reviews-info__rating-item"]}>
          <div className={styles["reviews-info__rating-item-title"]}>
            5 звезд
          </div>
          <ProgressBar
            currentPercent={calculateRatingSummeryPercent(
              reviews.length,
              ratingSummeryMap.get(5)!,
            )}
          />
          <div className={styles["reviews-info__rating-item-quantity"]}>
            {ratingSummeryMap.get(5)}
          </div>
        </div>
        <div className={styles["reviews-info__rating-item"]}>
          <div className={styles["reviews-info__rating-item-title"]}>
            4 звезды
          </div>
          <ProgressBar
            currentPercent={calculateRatingSummeryPercent(
              reviews.length,
              ratingSummeryMap.get(4)!,
            )}
          />
          <div className={styles["reviews-info__rating-item-quantity"]}>
            {ratingSummeryMap.get(4)}
          </div>
        </div>
        <div className={styles["reviews-info__rating-item"]}>
          <div className={styles["reviews-info__rating-item-title"]}>
            3 звезды
          </div>
          <ProgressBar
            currentPercent={calculateRatingSummeryPercent(
              reviews.length,
              ratingSummeryMap.get(3)!,
            )}
          />
          <div className={styles["reviews-info__rating-item-quantity"]}>
            {ratingSummeryMap.get(3)}
          </div>
        </div>
        <div className={styles["reviews-info__rating-item"]}>
          <div className={styles["reviews-info__rating-item-title"]}>
            2 звезды
          </div>
          <ProgressBar
            currentPercent={calculateRatingSummeryPercent(
              reviews.length,
              ratingSummeryMap.get(2)!,
            )}
          />
          <div className={styles["reviews-info__rating-item-quantity"]}>
            {ratingSummeryMap.get(2)}
          </div>
        </div>
        <div className={styles["reviews-info__rating-item"]}>
          <div className={styles["reviews-info__rating-item-title"]}>
            1 звезда
          </div>
          <ProgressBar
            currentPercent={calculateRatingSummeryPercent(
              reviews.length,
              ratingSummeryMap.get(1)!,
            )}
          />
          <div className={styles["reviews-info__rating-item-quantity"]}>
            {ratingSummeryMap.get(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsInfo;
