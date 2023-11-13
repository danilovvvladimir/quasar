"use client";

import { FC } from "react";
import Button from "../UI/Button/Button";
import SingleReview from "../SingleReview/SingleReview";
import { Review } from "@/types/review";
import ReviewsInfo from "../ReviewsInfo/ReviewsInfo";
import styles from "./Reviews.module.scss";

interface ReviewsProps {
  reviews: Review[];
  openCreateReviewModal: () => void;
  userHasProduct: boolean;
  userHasReview: boolean;
}

const Reviews: FC<ReviewsProps> = ({
  reviews,
  openCreateReviewModal,
  userHasProduct,
  userHasReview,
}) => {
  return (
    <div className={styles["reviews"]}>
      <h2 className={`title ${styles["reviews__title"]}`}>Отзывы</h2>
      <div className={styles["reviews__wrapper"]}>
        <div className={styles["reviews__list"]}>
          {reviews.map((review) => (
            <SingleReview key={review.id} {...review} />
          ))}
        </div>
        <div className={styles["reviews__info"]}>
          <ReviewsInfo reviews={reviews} />
          <div className={styles["reviews__disclaimer"]}>
            Отзывы могут оставлять только те, кто купил товар. Так мы формируем
            честный рейтинг
          </div>
          {userHasProduct && (
            <Button
              onClick={openCreateReviewModal}
              className={styles["reviews__button"]}
            >
              {userHasReview ? "Редактировать отзыв" : "Написать отзыв"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
