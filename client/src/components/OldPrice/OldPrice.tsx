import { FC } from "react";
import styles from "./OldPrice.module.scss";
import { getDecoratedPrice } from "@/utils/getDecoratedPrice";
import classNames from "classnames";

interface OldPriceProps {
  oldPrice: number;
  className?: string;
}

const OldPrice: FC<OldPriceProps> = ({ oldPrice, className }) => {
  const finalClassName = classNames(styles["old-price"], className);

  return <div className={finalClassName}>{getDecoratedPrice(oldPrice)}</div>;
};

export default OldPrice;
