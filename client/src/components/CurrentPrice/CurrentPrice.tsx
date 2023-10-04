import { FC } from "react";
import styles from "./CurrentPrice.module.scss";
import { getDecoratedPrice } from "@/utils/getDecoratedPrice";
import classNames from "classnames";

interface CurrentPriceProps {
  currentPrice: number;
  className?: string;
}

const CurrentPrice: FC<CurrentPriceProps> = ({ currentPrice, className }) => {
  const finalClassName = classNames(styles["current-price"], className);

  return (
    <span className={finalClassName}>{getDecoratedPrice(currentPrice)}</span>
  );
};

export default CurrentPrice;
