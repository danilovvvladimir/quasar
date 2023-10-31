"use client";

import { FC, useState, useEffect } from "react";
import styles from "../AdminPage.module.scss";
import { Order } from "@/types/order";
import ReviewService from "@/services/review";
import AdminTableReviews from "@/components/AdminTable/AdminTableReviews/AdminTableReviews";

const AdminReviewsPage: FC = () => {
  const reviewService = new ReviewService();
  const [reviews, setReviews] = useState<Order[]>([]);

  const updateData = async () => {
    const reviews = await reviewService.getAll();

    setReviews(reviews);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <section className={styles["admin-orders"]}>
      <div className={styles["admin-orders__wrapper"]}>
        <AdminTableReviews updateData={updateData} reviews={reviews} />
      </div>
    </section>
  );
};

export default AdminReviewsPage;
