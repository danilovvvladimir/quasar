"use client";

import { FC, useEffect, useState } from "react";
import styles from "../AdminPage.module.scss";
import AdminService, { AdminPanelStatistics } from "@/services/admin";
import Loader from "@/components/Loader/Loader";

const AdminStatiscticsPage: FC = () => {
  const adminService = new AdminService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<AdminPanelStatistics>();

  const updateData = async () => {
    setIsLoading(true);
    const statistics = await adminService.getStatistics();

    setStatistics(statistics);
    setIsLoading(false);
  };

  useEffect(() => {
    updateData();
  }, []);

  if (!statistics) {
    return <Loader />;
  }

  return (
    <section className={styles["admin-statistics"]}>
      <div className={styles["admin-statistics__blocks"]}>
        <div className={styles["admin-statistics__block"]}>
          Пользователи:
          <span>{statistics.users} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Отзывы:
          <span>{statistics.reviews} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Заказы:
          <span>{statistics.orders} </span>
        </div>
        <div className={styles["admin-statistics__block"]}>
          Заработано:
          <span>{statistics.totalIncome} </span>
        </div>
      </div>
    </section>
  );
};

export default AdminStatiscticsPage;
