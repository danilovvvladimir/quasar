"use client";

import { FC, useState } from "react";
import styles from "../AdminTable.module.scss";
import { Category } from "@/types/category";
import Modal from "@/components/UI/Modal/Modal";
import CreateCategoryModal from "@/components/CreateCategoryForm/CreateCategoryModal";

interface AdminTableCategoriesProps {
  categories: Category[];
  deleteCategory: (id: string) => void;
  updateData: () => void;
}

const AdminTableCategories: FC<AdminTableCategoriesProps> = ({
  categories,
  deleteCategory,
  updateData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

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
                onClick={() => {
                  setSelectedCategory(category);
                  setIsModalVisible(true);
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
                    d="M20.625 19.5938H3.375C2.96016 19.5938 2.625 19.9289 2.625 20.3438V21.1875C2.625 21.2906 2.70937 21.375 2.8125 21.375H21.1875C21.2906 21.375 21.375 21.2906 21.375 21.1875V20.3438C21.375 19.9289 21.0398 19.5938 20.625 19.5938ZM6.03984 17.625C6.08672 17.625 6.13359 17.6203 6.18047 17.6133L10.1227 16.9219C10.1695 16.9125 10.2141 16.8914 10.2469 16.8563L20.182 6.92109C20.2038 6.89941 20.221 6.87366 20.2328 6.8453C20.2445 6.81695 20.2506 6.78656 20.2506 6.75586C20.2506 6.72516 20.2445 6.69477 20.2328 6.66642C20.221 6.63806 20.2038 6.61231 20.182 6.59063L16.2867 2.69297C16.2422 2.64844 16.1836 2.625 16.1203 2.625C16.057 2.625 15.9984 2.64844 15.9539 2.69297L6.01875 12.6281C5.98359 12.6633 5.9625 12.7055 5.95312 12.7523L5.26172 16.6945C5.23892 16.8201 5.24707 16.9493 5.28545 17.071C5.32384 17.1927 5.39132 17.3032 5.48203 17.393C5.63672 17.543 5.83125 17.625 6.03984 17.625Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div
                className={styles["admin-table__categories-action"]}
                onClick={() => {
                  deleteCategory(category.id);
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
      {isModalVisible && selectedCategory && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <CreateCategoryModal category={selectedCategory} />
        </Modal>
      )}
    </div>
  );
};

export default AdminTableCategories;
