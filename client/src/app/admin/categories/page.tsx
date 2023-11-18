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
import { createNotify, notifyMode } from "@/utils/createNotify";
import { CATEGORY_DELETE_NOTIFY_MESSAGE } from "@/constants/messages";
import { AxiosError } from "axios";
import { AxiosErrorData } from "@/axios";

const AdminCategoriesPage: FC = () => {
  const categoryService = new CategoryService();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const deleteCategory = async (id: string) => {
    try {
      await categoryService.delete(id);
      createNotify(CATEGORY_DELETE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
    } catch (error) {
      const err = error as AxiosError;
      const errorData = err.response?.data as AxiosErrorData;

      createNotify(errorData.message, notifyMode.ERROR);
    }
  };

  const updateData = async () => {
    const data = await categoryService.getAll();

    setCategories(data);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <section className={styles["admin-categories"]}>
      <div className={styles["admin-categories__wrapper"]}>
        <div className={styles["admin-categories__controls"]}>
          <SearchAdmin />
          <Button onClick={() => setIsModalVisible(true)}>Создать</Button>
        </div>
        <AdminTableCategories
          categories={categories}
          deleteCategory={deleteCategory}
          updateData={updateData}
        />
      </div>
      {isModalVisible && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <CreateCategoryModal />
        </Modal>
      )}
    </section>
  );
};

export default AdminCategoriesPage;
