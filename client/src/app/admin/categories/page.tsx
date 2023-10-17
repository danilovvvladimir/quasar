"use client";

import { FC, useEffect, useState } from "react";
import styles from "../AdminPage.module.scss";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import Button from "@/components/UI/Button/Button";
import AdminTableCategories from "@/components/AdminTable/AdminTableCategories/AdminTableCategories";
import { Category } from "@/types/category";
import Modal from "@/components/UI/Modal/Modal";
import CategoryService from "@/services/category";
import CreateCategoryModal from "@/components/CreateCategoryForm/CreateCategoryModal";

const AdminCategoriesPage: FC = () => {
  const categoryService = new CategoryService();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await categoryService.getAll();

      setCategories(data);
    };

    getData();
  }, []);

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
        <CreateCategoryModal />
      </Modal>
    </section>
  );
};

export default AdminCategoriesPage;
