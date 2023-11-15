"use client";

import { FC, useState, useEffect } from "react";
import styles from "../AdminPage.module.scss";
import ReviewService from "@/services/review";
import AdminTableReviews from "@/components/AdminTable/AdminTableReviews/AdminTableReviews";
import { Review } from "@/types/review";
import Modal from "@/components/UI/Modal/Modal";
import ProfileSingleReview from "@/components/ProfileSingleReview/ProfileSingleReview";
import { createNotify, notifyMode } from "@/utils/createNotify";

const AdminReviewsPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const reviewService = new ReviewService();
  const [reviews, setReviews] = useState<Review[]>([]);

  const updateData = async () => {
    const reviews = await reviewService.getAll();

    setReviews(reviews);
  };

  const deleteReview = async (id: string) => {
    await reviewService.delete(id);

    createNotify("Вы успешно удалили отзыв", notifyMode.SUCCESS);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <section className={styles["admin-orders"]}>
      <div className={styles["admin-orders__wrapper"]}>
        <AdminTableReviews
          updateData={updateData}
          openModal={() => setIsModalVisible(true)}
          setSelectedReview={setSelectedReview}
          reviews={reviews}
          deleteReview={deleteReview}
        />
      </div>
      {isModalVisible && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <ProfileSingleReview review={selectedReview!} />
        </Modal>
      )}
    </section>
  );
};

export default AdminReviewsPage;
