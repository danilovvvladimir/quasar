"use client";

import { FC, useEffect, useState } from "react";
import ProfileSingleOrder from "@/components/ProfileSingleOrder/ProfileSingleOrder";
import { Order } from "@/types/order";
import styles from "../ProfilePage.module.scss";
import OrderService from "@/services/order";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProfileOrdersInnerProps {}

const ProfileOrdersInner: FC<ProfileOrdersInnerProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [orders, setOrders] = useState<Order[]>([]);
  const orderService = new OrderService();

  const updateData = async () => {
    if (!user) {
      return;
    }

    const orders = await orderService.getByUser(user.id);

    setOrders(orders);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className={styles["profile-orders__wrapper"]}>
      {orders.map((order) => (
        <ProfileSingleOrder
          key={order.id}
          orderStatus={order.orderStatus}
          orderDate={new Date(order.createdAt)}
          orderItems={order.orderItems.map((oi) => ({
            ...oi,
            totalPrice: +oi.totalPrice,
          }))}
        />
      ))}
    </div>
  );
};

export default ProfileOrdersInner;
