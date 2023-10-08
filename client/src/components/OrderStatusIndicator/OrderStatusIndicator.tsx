import { FC } from "react";
import styles from "./OrderStatusIndicator.module.scss";
import { OrderStatus } from "@/types/order";
import classNames from "classnames";
import { getOrderStatusText } from "@/utils/getOrderStatusText";

interface OrderStatusIndicatorProps {
  orderStatus: OrderStatus;
}

const OrderStatusIndicator: FC<OrderStatusIndicatorProps> = ({
  orderStatus,
}) => {
  return (
    <div
      className={classNames(styles["order-status"], {
        [styles["order-status--delivered"]]:
          orderStatus === OrderStatus.DELIVERED,
        [styles["order-status--pending"]]: orderStatus === OrderStatus.PENDING,
        [styles["order-status--processing"]]:
          orderStatus === OrderStatus.PROCESSING,
      })}
    >
      {getOrderStatusText(orderStatus)}
    </div>
  );
};

export default OrderStatusIndicator;
