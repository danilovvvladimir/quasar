import { FC } from "react";
import styles from "./SingleOrderItem.module.scss";
import { OrderItem } from "@/types/order";
import Image from "next/image";
import Badge from "../Badge/Badge";

interface SingleOrderItemProps {
  orderItem: OrderItem;
}

const SingleOrderItem: FC<SingleOrderItemProps> = ({ orderItem }) => {
  return (
    <div className={styles["order-item"]}>
      <Image
        className={styles["order-item__image"]}
        src="/product-image.jpg"
        alt="product name"
        width={75}
        height={75}
      />
      {orderItem.quantity > 1 && (
        <Badge
          className={styles["order-item__quantity"]}
          quantity={orderItem.quantity}
        />
      )}
      <div className={styles["order-item__size"]}>{orderItem.size}</div>
    </div>
  );
};

export default SingleOrderItem;
