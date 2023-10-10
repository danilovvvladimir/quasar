import { FC } from "react";
import styles from "../AdminPage.module.scss";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import Button from "@/components/UI/Button/Button";
import AdminTableCategories from "@/components/AdminTable/AdminTableCategories/AdminTableCategories";
import { Category } from "@/types/category";

const AdminCategoriesPage: FC = () => {
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
          <Button>Создать</Button>
        </div>
        <AdminTableCategories categories={categories} />
      </div>
    </section>
  );
};

export default AdminCategoriesPage;
