"use client";

import { FC } from "react";
import styles from "../AdminPage.module.scss";

const AdminStatiscticsPage: FC = () => {
  const usersCount = 100;
  const reviewsCount = 50;
  const ordersCount = 30;
  const totalIncome = 100500;

  return (
    <section className={styles["admin-statistics"]}>
      <div className={styles["admin-statistics__blocks"]}>
        <div className={styles["admin-statistics__block"]}>
          Пользователи:
          <span>{usersCount} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Отзывы:
          <span>{reviewsCount} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Заказы:
          <span>{ordersCount} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Заработано:
          <span>{totalIncome} </span>
        </div>
      </div>
    </section>
  );
};

export default AdminStatiscticsPage;
