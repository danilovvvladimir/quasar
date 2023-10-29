"use client";

import { FC, useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import SingleReview from "../SingleReview/SingleReview";
import { Review } from "@/types/review";
import ReviewsInfo from "../ReviewsInfo/ReviewsInfo";
import styles from "./Reviews.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ReviewsProps {
  reviews: Review[];
  openModal: () => void;
  userHasProduct: boolean;
}

const Reviews: FC<ReviewsProps> = ({ reviews, openModal, userHasProduct }) => {
  return (
    <div className={styles["reviews"]}>
      <h2 className={`title ${styles["reviews__title"]}`}>Отзывы</h2>
      <div className={styles["reviews__wrapper"]}>
        <div className={styles["reviews__list"]}>
          {reviews.map((review) => (
            <SingleReview key={review.id} {...review} />
          ))}
          {/* ? show more button ? */}
        </div>
        <div className={styles["reviews__info"]}>
          {/* таблица */}
          <ReviewsInfo reviews={reviews} />
          <div className={styles["reviews__disclaimer"]}>
            Отзывы могут оставлять только те, кто купил товар. Так мы формируем
            честный рейтинг
          </div>
          {userHasProduct && (
            <Button onClick={openModal} className={styles["reviews__button"]}>
              Написать отзыв
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
