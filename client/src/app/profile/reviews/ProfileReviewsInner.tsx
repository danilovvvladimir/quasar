import { FC } from "react";
import styles from "../ProfilePage.module.scss";
import { Review } from "@/types/review";
import ProfileSingleReview from "@/components/ProfileSingleReview/ProfileSingleReview";

interface ProfileReviewsInnerProps {}

const ProfileReviewsInner: FC<ProfileReviewsInnerProps> = () => {
  const reviews: Review[] = [
    {
      id: "1",
      productId: "1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      rating: 5,
      user: { id: "1", username: "aboba" },
      createdAt: new Date(-5),
      updatedAt: new Date(),
    },
    {
      id: "1",
      productId: "2",
      text: "not goood not very good",
      rating: 3,
      user: { id: "1", username: "aboba" },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className={styles["profile-reviews__wrapper"]}>
      {reviews.map((review) => (
        <ProfileSingleReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ProfileReviewsInner;
