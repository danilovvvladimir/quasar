import { FC } from "react";
import styles from "../ProfilePage.module.scss";
import ProfileReviewsInner from "./ProfileReviewsInner";

export const metadata = {
  title: "QUASAR | Отзывы",
  description: "Quasar отзывы",
};

const ProfileReviewsPage: FC = () => {
  return (
    <section className={styles["profile-reviews"]}>
      <ProfileReviewsInner />
    </section>
  );
};

export default ProfileReviewsPage;
