import { FC, useState } from "react";
import styles from "./OrderStatusSelect.module.scss";
import { OrderStatus } from "@/types/order";
import Select from "../UI/Select/Select";
import { IOption } from "@/hooks/useHomePageInner";
import OrderService from "@/services/order";

interface OrderStatusSelectProps {
  currentOrderStatus: string;
  orderId: string;
  changeUserOrderStatus: (newOrderStatus: string, id: string) => void;
}

// interface Option {
//   label: string;
//   value: string;
//   id: string;
// }

const OrderStatusSelect: FC<OrderStatusSelectProps> = ({
  currentOrderStatus,
  orderId,
  changeUserOrderStatus,
}) => {
  const orderService = new OrderService();
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<IOption>({
    label: currentOrderStatus,
    value: currentOrderStatus,
  });

  const options = Object.values(OrderStatus).map((item) => ({
    label: item.toString(),
    value: item.toString(),
  }));

  const setSelectedOption = (newSelectedOption: IOption | null) => {
    if (newSelectedOption) {
      setSelectedOrderStatus(newSelectedOption);

      changeUserOrderStatus(newSelectedOption.label, orderId);
    }
  };

  return (
    <Select
      options={options}
      selectedOption={selectedOrderStatus}
      setSelectedOption={setSelectedOption}
    />
  );
};

export default OrderStatusSelect;
