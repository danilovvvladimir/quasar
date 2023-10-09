import { FC } from "react";
import styles from "./AdminNavigation.module.scss";
import ProfileNavigationItem from "../ProfileNavigationItem/ProfileNavigationItem";

const AdminNavigation: FC = () => {
  return (
    <div className={styles["admin-navigation"]}>
      <ProfileNavigationItem label="Статистика" url="/admin/statistics" />
      <ProfileNavigationItem label="Пользователи" url="/admin/users" />
      <ProfileNavigationItem label="Категории" url="/admin/categories" />
      <ProfileNavigationItem label="Продукты" url="/admin/products" />
      <ProfileNavigationItem label="Заказы" url="/admin/orders" />
      <ProfileNavigationItem label="Отзывы" url="/admin/reviews" />
    </div>
  );
};

export default AdminNavigation;
