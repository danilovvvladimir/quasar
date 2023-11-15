"use client";

import { FC } from "react";
import styles from "../AdminTable.module.scss";
import { Category } from "@/types/category";

interface AdminTableCategoriesProps {
  categories: Category[];
}

const AdminTableCategories: FC<AdminTableCategoriesProps> = ({
  categories,
}) => {
  return (
    <div className={styles["admin-table__categories"]}>
      <div className={styles["admin-table__categories-header"]}>
        <div className={styles["admin-table__categories-header-name"]}>
          Название
        </div>
        <div className={styles["admin-table__categories-header-slug"]}>
          Slug
        </div>
        <div className={styles["admin-table__categories-header-actions"]}>
          Действия
        </div>
      </div>
      <div className={styles["admin-table__categories-rows"]}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles["admin-table__categories-row"]}
          >
            <div className={styles["admin-table__categories-row-name"]}>
              {category.name}
            </div>
            <div className={styles["admin-table__categories-row-slug"]}>
              {category.slug}
            </div>
            <div className={styles["admin-table__categories-row-actions"]}>
              <div
                className={styles["admin-table__categories-action"]}
                onClick={() => console.log(category.id)}
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

export default AdminTableCategories;
