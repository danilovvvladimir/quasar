import { FC } from "react";
import "./CurrentPrice.scss";
import { getDecoratedPrice } from "@/utils/getDecoratedPrice";

interface CurrentPriceProps {
  currentPrice: number;
  className?: string;
}

const CurrentPrice: FC<CurrentPriceProps> = ({ currentPrice, className }) => {
  const finalClassName = className
    ? `current-price ${className}`
    : "current-price";

  return (
    <span className={finalClassName}>{getDecoratedPrice(currentPrice)}</span>
  );
};

export default CurrentPrice;
