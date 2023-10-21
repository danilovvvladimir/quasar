"use client";

import { FC } from "react";
import styles from "../AdminTable.module.scss";
import { AdminProduct, Product } from "@/types/product";
import ProductService from "@/services/product";
import { createNotify, notifyMode } from "@/utils/createNotify";

interface AdminTableProductsProps {
  products: AdminProduct[];
  updateData(): void;
}

const AdminTableProducts: FC<AdminTableProductsProps> = ({
  products,
  updateData,
}) => {
  const handleDeleteProduct = async (id: string) => {
    const productService = new ProductService();

    try {
      await productService.delete(id);
      createNotify("Вы успешно удалили товар!");
      updateData();
    } catch (error) {
      const err = error as Error;
      createNotify(`Что-то пошло не так...\n${err.message}`, notifyMode.ERROR);
    }
  };

  return (
    <div className={styles["admin-table__products"]}>
      <div className={styles["admin-table__products-header"]}>
        <div className={styles["admin-table__products-header-name"]}>Name</div>
        <div className={styles["admin-table__products-header-slug"]}>Slug</div>
        <div className={styles["admin-table__products-header-rating"]}>
          Rating
        </div>
        <div className={styles["admin-table__products-header-orders"]}>
          Orders
        </div>
        <div className={styles["admin-table__products-header-reviews"]}>
          Reviews
        </div>
        <div className={styles["admin-table__products-header-actions"]}>
          Actions
        </div>
      </div>
      <div className={styles["admin-table__products-rows"]}>
        {products.map((product) => (
          <div key={product.id} className={styles["admin-table__products-row"]}>
            <div className={styles["admin-table__products-row-name"]}>
              {product.name}
            </div>
            <div className={styles["admin-table__products-row-slug"]}>
              {product.slug}
            </div>
            <div className={styles["admin-table__products-row-rating"]}>
              {product.rating}
            </div>
            <div className={styles["admin-table__products-row-orders"]}>
              {product.ordersCount}
            </div>
            <div className={styles["admin-table__products-row-reviews"]}>
              {product.reviewsCount}
            </div>
            <div className={styles["admin-table__products-row-actions"]}>
              <div
                className={styles["admin-table__products-action"]}
                onClick={() => console.log(product.id)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.625 19.5938H3.375C2.96016 19.5938 2.625 19.9289 2.625 20.3438V21.1875C2.625 21.2906 2.70937 21.375 2.8125 21.375H21.1875C21.2906 21.375 21.375 21.2906 21.375 21.1875V20.3438C21.375 19.9289 21.0398 19.5938 20.625 19.5938ZM6.03984 17.625C6.08672 17.625 6.13359 17.6203 6.18047 17.6133L10.1227 16.9219C10.1695 16.9125 10.2141 16.8914 10.2469 16.8563L20.182 6.92109C20.2038 6.89941 20.221 6.87366 20.2328 6.8453C20.2445 6.81695 20.2506 6.78656 20.2506 6.75586C20.2506 6.72516 20.2445 6.69477 20.2328 6.66642C20.221 6.63806 20.2038 6.61231 20.182 6.59063L16.2867 2.69297C16.2422 2.64844 16.1836 2.625 16.1203 2.625C16.057 2.625 15.9984 2.64844 15.9539 2.69297L6.01875 12.6281C5.98359 12.6633 5.9625 12.7055 5.95312 12.7523L5.26172 16.6945C5.23892 16.8201 5.24707 16.9493 5.28545 17.071C5.32384 17.1927 5.39132 17.3032 5.48203 17.393C5.63672 17.543 5.83125 17.625 6.03984 17.625Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div
                className={styles["admin-table__products-action"]}
                onClick={() => console.log(product.id)}
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
                className={styles["admin-table__products-action"]}
                onClick={() => handleDeleteProduct(product.id)}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableProducts;
