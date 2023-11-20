"use client";

import { FC, useState, useEffect } from "react";
import styles from "../AdminPage.module.scss";
import OrderService from "@/services/order";
import { Order } from "@/types/order";
import AdminTableOrders from "@/components/AdminTable/AdminTableOrders/AdminTableOrders";
import Modal from "@/components/UI/Modal/Modal";
import ProfileSingleOrder from "@/components/ProfileSingleOrder/ProfileSingleOrder";

const AdminOrdersPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
        <AdminTableOrders
          orders={orders}
          setSelectedOrder={setSelectedOrder}
          openModal={() => setIsModalVisible(true)}
          updateData={updateData}
        />
      </div>
      {isModalVisible && selectedOrder && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <ProfileSingleOrder
            orderDate={new Date(selectedOrder.createdAt)}
            orderStatus={selectedOrder.orderStatus}
            orderItems={selectedOrder.orderItems.map((oi) => ({
              ...oi,
              totalPrice: +oi.totalPrice,
            }))}
          />
        </Modal>
      )}
    </section>
  );
};

export default AdminOrdersPage;
