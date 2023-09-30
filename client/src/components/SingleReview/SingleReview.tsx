import { FC } from "react";
import "./SingleReview.scss";
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
    <div className="single-review">
      <div className="single-review__wrapper">
        <div className="single-review__info">
          <div className="single-review__details">
            <div className="single-review__username">{user.username}</div>
            <div className="single-review__date">
              / {createdAt.toLocaleDateString()}
            </div>
          </div>
          <div className="single-review__rating">
            <Rating value={rating} />
          </div>
        </div>
        <div className="single-review__text">{text}</div>
      </div>
    </div>
  );
};

export default SingleReview;
