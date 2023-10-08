import { FC } from "react";
import styles from "../ProfilePage.module.scss";
import ProfileOrdersInner from "./ProfileOrdersInner";

export const metadata = {
  title: "QUASAR | Заказы",
  description: "Quasar заказы",
};

const ProfileOrdersPage: FC = () => {
  return (
    <section className={styles["profile-orders"]}>
      <ProfileOrdersInner />
    </section>
  );
};

export default ProfileOrdersPage;
