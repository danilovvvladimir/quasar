import { FC } from "react";
import styles from "./ProfileNavigation.module.scss";
import ProfileNavigationItem from "../ProfileNavigationItem/ProfileNavigationItem";

const ProfileNavigation: FC = () => {
  return (
    <div className={styles["profile-navigation"]}>
      <ProfileNavigationItem label="Профиль" url="/profile/info" />
      <ProfileNavigationItem label="Заказы" url="/profile/orders" />
      <ProfileNavigationItem label="Отзывы" url="/profile/reviews" />
    </div>
  );
};

export default ProfileNavigation;
