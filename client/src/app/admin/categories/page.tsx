"use client";

import { FC, useState } from "react";
import styles from "../AdminPage.module.scss";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import Button from "@/components/UI/Button/Button";
import AdminTableCategories from "@/components/AdminTable/AdminTableCategories/AdminTableCategories";
import { Category } from "@/types/category";
import Modal from "@/components/UI/Modal/Modal";
import CreateCategoryForm from "@/components/CreateCategoryForm/CreateCategoryForm";

const AdminCategoriesPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const categories: Category[] = [
    {
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      isVisible: true,
      name: "Sneakers",
      slug: "sneakers",
    },
    {
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
      isVisible: true,
      name: "Hoodie",
      slug: "hoodie",
    },
  ];

  return (
    <section className={styles["admin-categories"]}>
      <div className={styles["admin-categories__wrapper"]}>
        <div className={styles["admin-categories__controls"]}>
          <SearchAdmin />
          <Button onClick={() => setIsModalVisible(true)}>Создать</Button>
        </div>
        <AdminTableCategories categories={categories} />
      </div>
      <Modal active={isModalVisible} setActive={setIsModalVisible}>
        <CreateCategoryForm />
      </Modal>
    </section>
  );
};

export default AdminCategoriesPage;
