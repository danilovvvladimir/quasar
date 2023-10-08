"use client";

import { FC } from "react";
import ProfileSingleOrder from "@/components/ProfileSingleOrder/ProfileSingleOrder";
import { Order, OrderItem, OrderStatus } from "@/types/order";
import styles from "../ProfilePage.module.scss";

interface ProfileOrdersInnerProps {}

const ProfileOrdersInner: FC<ProfileOrdersInnerProps> = () => {
  const orders: Order[] = [
    {
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderStatus: OrderStatus.PROCESSING,
      userId: "1",
    },
    {
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderStatus: OrderStatus.PENDING,
      userId: "1",
    },
  ];

  const orderItems: OrderItem[] = [
    {
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId: "1",
      productId: "1",
      quantity: 2,
      totalPrice: 3500,
      size: 43,
    },
    {
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId: "1",
      productId: "3",
      quantity: 1,
      totalPrice: 1200,
      size: 43,
    },
    {
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderId: "2",
      productId: "3",
      quantity: 3,
      totalPrice: 2400,
      size: 43,
    },
  ];

  return (
    <div className={styles["profile-orders__wrapper"]}>
      {orders.map((order) => (
        <ProfileSingleOrder
          key={order.id}
          orderStatus={order.orderStatus}
          orderDate={order.createdAt}
          orderItems={orderItems.filter((oi) => oi.orderId === order.id)}
        />
      ))}
    </div>
  );
};

export default ProfileOrdersInner;
