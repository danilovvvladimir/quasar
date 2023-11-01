import { FC } from "react";
import styles from "./SingleOrderItem.module.scss";
import { OrderItem } from "@/types/order";
import Image from "next/image";
import Badge from "../Badge/Badge";
import Link from "next/link";

interface SingleOrderItemProps {
  orderItem: OrderItem;
}

// TODO types
const SingleOrderItem: FC<SingleOrderItemProps> = ({ orderItem }) => {
  return (
    <Link
      href={`/products/${orderItem.product.slug}`}
      className={styles["order-item"]}
    >
      <Image
        className={styles["order-item__image"]}
        src={"/" + orderItem.product.productImage[0].imagePath}
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
    </Link>
  );
};

export default SingleOrderItem;
