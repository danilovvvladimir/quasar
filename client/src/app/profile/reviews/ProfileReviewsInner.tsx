"use client";

import { FC, useState, useEffect } from "react";
import styles from "../ProfilePage.module.scss";
import { Review } from "@/types/review";
import ProfileSingleReview from "@/components/ProfileSingleReview/ProfileSingleReview";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ReviewService from "@/services/review";

interface ProfileReviewsInnerProps {}

const ProfileReviewsInner: FC<ProfileReviewsInnerProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewService = new ReviewService();

  const updateData = async () => {
    const reviews = await reviewService.getByUserId(user.id);

    setReviews(reviews);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className={styles["profile-reviews__wrapper"]}>
      {reviews.map((review) => (
        <ProfileSingleReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ProfileReviewsInner;
