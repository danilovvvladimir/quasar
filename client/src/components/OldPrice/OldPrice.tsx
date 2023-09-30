import { FC } from "react";
import "./OldPrice.scss";
import { getDecoratedPrice } from "@/utils/getDecoratedPrice";

interface OldPriceProps {
  oldPrice: number;
  className?: string;
}

const OldPrice: FC<OldPriceProps> = ({ oldPrice, className }) => {
  const finalClassName = className ? `old-price ${className}` : "old-price";

  return <div className={finalClassName}>{getDecoratedPrice(oldPrice)}</div>;
};

export default OldPrice;
