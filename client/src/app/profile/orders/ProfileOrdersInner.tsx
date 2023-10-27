"use client";

import { FC, useEffect, useState } from "react";
import ProfileSingleOrder from "@/components/ProfileSingleOrder/ProfileSingleOrder";
import { Order, OrderItem, OrderStatus } from "@/types/order";
import styles from "../ProfilePage.module.scss";
import OrderService from "@/services/order";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProfileOrdersInnerProps {}

const ProfileOrdersInner: FC<ProfileOrdersInnerProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [orders, setOrders] = useState<Order[]>([]);
  const orderService = new OrderService();

  // const orders: Order[] = [
  //   {
  //     id: "1",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     orderStatus: OrderStatus.PROCESSING,
  //     userId: "1",
  //   },
  //   {
  //     id: "2",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     orderStatus: OrderStatus.PENDING,
  //     userId: "1",
  //   },
  // ];

  // const orderItems: OrderItem[] = [
  //   {
  //     id: "1",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     orderId: "1",
  //     productId: "1",
  //     quantity: 2,
  //     totalPrice: 3500,
  //     size: 43,
  //   },
  //   {
  //     id: "2",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     orderId: "1",
  //     productId: "3",
  //     quantity: 1,
  //     totalPrice: 1200,
  //     size: 43,
  //   },
  //   {
  //     id: "2",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     orderId: "2",
  //     productId: "3",
  //     quantity: 3,
  //     totalPrice: 2400,
  //     size: 43,
  //   },
  // ];

  const updateData = async () => {
    const products = await orderService.getByUser(user.id);

    const newCartItems = products.map((item) => ({
      ...item,
      ...item.product,
      isSelected: false,
    }));

    setOrders(products);
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
          orderItems={order.orderItem.map((oi) => ({
            ...oi,
            totalPrice: +oi.totalPrice,
          }))}
        />
      ))}
    </div>
  );
};

export default ProfileOrdersInner;
