import { FC } from "react";
import styles from "./DiscountBadge.module.scss";
import classNames from "classnames";

interface DiscountBadgeProps {
  discountPercent: number;
  className?: string;
}

const DiscountBadge: FC<DiscountBadgeProps> = ({
  discountPercent,
  className,
}) => {
  const finalClassName = classNames(styles["discount-badge"], className);

  return <div className={finalClassName}>-{discountPercent}%</div>;
};

export default DiscountBadge;
