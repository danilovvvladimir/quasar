"use client";

import { FC } from "react";
import "./Reviews.scss";
import Button from "../UI/Button/Button";
import SingleReview from "../SingleReview/SingleReview";
import { Review } from "@/types/review";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="reviews">
      <h2 className="title reviews__title">Отзывы</h2>
      <div className="reviews__wrapper">
        <div className="reviews__list">
          {reviews.map((review) => (
            <SingleReview key={review.id} {...review} />
          ))}
          {/* ? show more button ? */}
        </div>
        <div className="reviews__info">
          {/* таблица */}
          <div className="reviews__disclaimer">
            Отзывы могут оставлять только те, кто купил товар. Так мы формируем
            честный рейтинг
          </div>
          <Button>Написать отзыв</Button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
