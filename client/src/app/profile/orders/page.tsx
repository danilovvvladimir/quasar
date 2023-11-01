import { FC } from "react";
import styles from "../ProfilePage.module.scss";
import ProfileOrdersInner from "./ProfileOrdersInner";
import {
  PROFILE_PAGE_ORDERS_METADATA_DESCRIPTION,
  PROFILE_PAGE_ORDERS_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata = {
  title: PROFILE_PAGE_ORDERS_METADATA_TITLE,
  description: PROFILE_PAGE_ORDERS_METADATA_DESCRIPTION,
};

const ProfileOrdersPage: FC = () => {
  return (
    <section className={styles["profile-orders"]}>
      <ProfileOrdersInner />
    </section>
  );
};

export default ProfileOrdersPage;
