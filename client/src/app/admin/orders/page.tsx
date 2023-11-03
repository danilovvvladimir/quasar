"use client";

import { FC, useState, useEffect } from "react";
import styles from "../AdminPage.module.scss";
import OrderService from "@/services/order";
import { Order } from "@/types/order";
import AdminTableOrders from "@/components/AdminTable/AdminTableOrders/AdminTableOrders";
// todo types
const AdminOrdersPage: FC = () => {
  const orderService = new OrderService();
  const [orders, setOrders] = useState<Order[]>([]);

  const updateData = async () => {
    const orders = await orderService.getAll();

    setOrders(orders);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <section className={styles["admin-orders"]}>
      <div className={styles["admin-orders__wrapper"]}>
        <AdminTableOrders orders={orders} />
      </div>
    </section>
  );
};

export default AdminOrdersPage;
