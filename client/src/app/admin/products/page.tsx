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
import { Category } from "@/types/category";
import CategoryService from "@/services/category";

const AdminProductsPage: FC = () => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const products = await productService.getAllAdminProducts();
      const categories = await categoryService.getAll();

      setProducts(products);
      setCategories(categories);
    };

    getData();
  }, []);

  console.log("Current products", products);
  console.log("Current categories", categories);

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
        <CreateProductModal categories={categories} />
      </Modal>
    </section>
  );
};

export default AdminProductsPage;
