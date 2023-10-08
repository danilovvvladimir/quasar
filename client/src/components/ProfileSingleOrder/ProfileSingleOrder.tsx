import { FC } from "react";
import styles from "./ProfileSingleOrder.module.scss";
import { OrderItem, OrderStatus } from "@/types/order";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import { calculateOrderTotal } from "@/utils/calculateOrderTotal";
import SingleOrderItem from "../SingleOrderItem/SingleOrderItem";
import OrderStatusIndicator from "../OrderStatusIndicator/OrderStatusIndicator";

interface ProfileSingleOrderProps {
  orderItems: OrderItem[];
  orderDate: Date;
  orderStatus: OrderStatus;
}

const ProfileSingleOrder: FC<ProfileSingleOrderProps> = ({
  orderItems,
  orderDate,
  orderStatus,
}) => {
  const orderTotalPrice = calculateOrderTotal(orderItems);

  return (
    <div className={styles["profile-single-order"]}>
      <div className={styles["profile-single-order__header"]}>
        <div className={styles["profile-single-order__header-info"]}>
          <span className={`title ${styles["profile-single-order__title"]}`}>
            Заказ от {orderDate.toLocaleDateString()}
          </span>
          <OrderStatusIndicator orderStatus={orderStatus} />
        </div>
        <div className={styles["profile-single-order__header-total"]}>
          оплачено{" "}
          <CurrentPrice
            className={styles["profile-single-order__total-price"]}
            currentPrice={orderTotalPrice}
          />
        </div>
      </div>
      <div className={styles["profile-single-order__items"]}>
        {orderItems.map((oi) => (
          <SingleOrderItem orderItem={oi} key={oi.id} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSingleOrder;
