"use client";

import { FC } from "react";
import styles from "../AdminTable.module.scss";
import { createNotify, notifyMode } from "@/utils/createNotify";
import OrderService from "@/services/order";
import { getShortEmail } from "@/utils/getShortEmail";
import OrderStatusSelect from "@/components/OrderStatusSelect/OrderStatusSelect";

interface AdminTableOrdersProps {
  orders: any[];
  setSelectedOrder: (newOrder: any) => void;
  openModal: () => void;
  updateData: () => void;
}

const AdminTableOrders: FC<AdminTableOrdersProps> = ({
  orders,
  setSelectedOrder,
  openModal,
  updateData,
}) => {
  const orderService = new OrderService();

  const changeUserOrderStatus = async (newOrderStatus: string, id: string) => {
    await orderService.changeUserOrderStatus(newOrderStatus, id);

    createNotify("Статус заказа успешно изменён", notifyMode.SUCCESS);
    updateData();
  };

  return (
    <div className={styles["admin-table__orders"]}>
      <div className={styles["admin-table__orders-header"]}>
        <div className={styles["admin-table__orders-header-email"]}>Email</div>
        <div className={styles["admin-table__orders-header-status"]}>
          Статус
        </div>
        <div className={styles["admin-table__orders-header-items"]}>Кол-во</div>
        <div className={styles["admin-table__orders-header-total-price"]}>
          Потрачено
        </div>
        <div className={styles["admin-table__orders-header-order-date"]}>
          Дата Заказа
        </div>
        <div className={styles["admin-table__orders-header-actions"]}>
          Действия
        </div>
      </div>
      <div className={styles["admin-table__orders-rows"]}>
        {orders.map((order) => (
          <div key={order.id} className={styles["admin-table__orders-row"]}>
            <div
              className={styles["admin-table__orders-row-email"]}
              title={order.user.email}
            >
              {getShortEmail(order.user.email)}
            </div>
            <div className={styles["admin-table__orders-row-status"]}>
              <OrderStatusSelect
                orderId={order.id}
                changeUserOrderStatus={changeUserOrderStatus}
                currentOrderStatus={order.orderStatus}
              />
            </div>
            <div className={styles["admin-table__orders-row-items"]}>
              {order.orderItems.length}
            </div>
            <div className={styles["admin-table__orders-row-total-price"]}>
              {order.totalPrice}
            </div>
            <div className={styles["admin-table__orders-row-order-date"]}>
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className={styles["admin-table__orders-row-actions"]}>
              <div
                className={styles["admin-table__orders-action"]}
                onClick={() => {
                  setSelectedOrder(order);
                  openModal();
                }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2636 2L16.9136 5.6567L9.15479 13.4298L10.7221 15L18.4809 7.22687L22.1309 10.8836V2H13.2636Z"
                    fill="#001A34"
                  />
                  <path
                    d="M19.9128 19.7778H4.38586V4.22222H12.1493L9.93118 2H4.38586C3.16256 2 2.16772 2.99667 2.16772 4.22222V19.7778C2.16772 21.0033 3.16256 22 4.38586 22H19.9128C21.1361 22 22.1309 21.0033 22.1309 19.7778V14.2222L19.9128 12V19.7778Z"
                    fill="#001A34"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableOrders;
