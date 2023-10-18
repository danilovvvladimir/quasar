"use client";

import { FC, useState, useEffect } from "react";
import styles from "../AdminPage.module.scss";
import { AdminProduct, Product } from "@/types/product";
import Button from "@/components/UI/Button/Button";
import SearchAdmin from "@/components/SearchAdmin/SearchAdmin";
import AdminTableProducts from "@/components/AdminTable/AdminTableProducts/AdminTableProducts";
import Modal from "@/components/UI/Modal/Modal";
import ProductService from "@/services/product";
import CreateProductModal from "@/components/CreateProductForm/CreateProductModal";

const AdminProductsPage: FC = () => {
  const productService = new ProductService();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await productService.getAllAdminProducts();

      setProducts(data);
    };

    getData();
  }, []);

  console.log("Current products", products);

  return (
    <section className={styles["admin-products"]}>
      <div className={styles["admin-products__wrapper"]}>
        <div className={styles["admin-products__controls"]}>
          <SearchAdmin />
          <Button onClick={() => setIsModalVisible(true)}>Создать</Button>
        </div>
        <AdminTableProducts products={products} />
      </div>
      <Modal active={isModalVisible} setActive={setIsModalVisible}>
        <CreateProductModal />
      </Modal>
    </section>
  );
};

export default AdminProductsPage;
