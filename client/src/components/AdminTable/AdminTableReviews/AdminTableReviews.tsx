"use client";

import { FC } from "react";
import styles from "../AdminTable.module.scss";
import ProductService from "@/services/order";
import { createNotify, notifyMode } from "@/utils/createNotify";
import OrderService from "@/services/order";
import { getShortEmail } from "@/utils/getShortEmail";
import ReviewService from "@/services/review";
import { Review } from "@/types/review";

interface AdminTableReviewsProps {
  reviews: any[];
  updateData: () => void;
  openModal: () => void;
  setSelectedReview: (review: Review) => void;
  deleteReview: (id: string) => void;
}

const AdminTableReviews: FC<AdminTableReviewsProps> = ({
  reviews,
  updateData,
  openModal,
  setSelectedReview,
  deleteReview,
}) => {
  const productService = new ProductService();

  return (
    <div className={styles["admin-table__reviews"]}>
      <div className={styles["admin-table__reviews-header"]}>
        <div className={styles["admin-table__reviews-header-product"]}>
          Название Товара
        </div>
        <div className={styles["admin-table__reviews-header-email"]}>Email</div>
        <div className={styles["admin-table__reviews-header-rating"]}>
          Рейтинг
        </div>
        <div className={styles["admin-table__reviews-header-actions"]}>
          Действия
        </div>
      </div>
      <div className={styles["admin-table__reviews-rows"]}>
        {reviews.map((review) => (
          <div key={review.id} className={styles["admin-table__reviews-row"]}>
            <div className={styles["admin-table__reviews-row-product"]}>
              {review.product.name}
            </div>
            <div className={styles["admin-table__reviews-row-email"]}>
              {getShortEmail(review.user.email)}
            </div>
            <div className={styles["admin-table__reviews-row-rating"]}>
              {review.rating}
            </div>
            <div className={styles["admin-table__reviews-row-actions"]}>
              <div
                className={styles["admin-table__reviews-action"]}
                onClick={() => {
                  setSelectedReview(review);

                  openModal();
                }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2636 2L16.9136 5.6567L9.15479 13.4298L10.7221 15L18.4809 7.22687L22.1309 10.8836V2H13.2636Z"
                    fill="#001A34"
                  />
                  <path
                    d="M19.9128 19.7778H4.38586V4.22222H12.1493L9.93118 2H4.38586C3.16256 2 2.16772 2.99667 2.16772 4.22222V19.7778C2.16772 21.0033 3.16256 22 4.38586 22H19.9128C21.1361 22 22.1309 21.0033 22.1309 19.7778V14.2222L19.9128 12V19.7778Z"
                    fill="#001A34"
                  />
                </svg>
              </div>
              <div
                className={styles["admin-table__reviews-action"]}
                onClick={() => {
                  deleteReview(review.id);

                  updateData();
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L21 21M3 21L21 3"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableReviews;
