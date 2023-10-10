import { FC } from "react";
import styles from "../AdminPage.module.scss";
import { AdminProduct } from "@/types/product";
import Button from "@/components/UI/Button/Button";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import AdminTableProducts from "@/components/AdminTable/AdminTableProducts/AdminTableProducts";

const AdminProductsPage: FC = () => {
  const products: AdminProduct[] = [
    {
      id: "1",
      name: " Nike Air Force 1'07 Nike Airffs...",
      slug: "temp-slug",
      ordersCount: 14,
      rating: 4.2,
      reviewsCount: 4,
    },
    {
      id: "2",
      name: " Nike Air Force 1'07 Nike Airffs...",
      slug: "tempfsaf-slug",
      ordersCount: 14,
      rating: 4.73,
      reviewsCount: 5,
    },
  ];

  return (
    <section className={styles["admin-products"]}>
      <div className={styles["admin-products__wrapper"]}>
        <div className={styles["admin-products__controls"]}>
          <SearchAdmin />
          <Button>Создать</Button>
        </div>
        <AdminTableProducts products={products} />
      </div>
    </section>
  );
};

export default AdminProductsPage;
