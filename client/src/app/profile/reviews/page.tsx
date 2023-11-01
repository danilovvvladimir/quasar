import { FC } from "react";
import styles from "../ProfilePage.module.scss";
import ProfileReviewsInner from "./ProfileReviewsInner";
import {
  PROFILE_PAGE_REVIEWS_METADATA_DESCRIPTION,
  PROFILE_PAGE_REVIEWS_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata = {
  title: PROFILE_PAGE_REVIEWS_METADATA_TITLE,
  description: PROFILE_PAGE_REVIEWS_METADATA_DESCRIPTION,
};

const ProfileReviewsPage: FC = () => {
  return (
    <section className={styles["profile-reviews"]}>
      <ProfileReviewsInner />
    </section>
  );
};

export default ProfileReviewsPage;
