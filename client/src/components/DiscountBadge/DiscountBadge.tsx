import { FC } from "react";
import styles from "./DiscountBadge.module.scss";
import classNames from "classnames";

interface DiscountBadgeProps {
  discountPercent: number;
  className?: string;
  isInverted?: boolean;
}

const DiscountBadge: FC<DiscountBadgeProps> = ({
  discountPercent,
  className,
  isInverted = false,
}) => {
  const finalClassName = classNames(
    styles["discount-badge"],
    {
      [styles["discount-badge--inverted"]]: isInverted,
    },
    className,
  );

  return <div className={finalClassName}>-{discountPercent}%</div>;
};

export default DiscountBadge;
