import { FC } from "react";
import "./DiscountBadge.scss";

interface DiscountBadgeProps {
  discountPercent: number;
  className?: string;
}

const DiscountBadge: FC<DiscountBadgeProps> = ({
  discountPercent,
  className,
}) => {
  const finalClassName = className
    ? `discount-badge ${className}`
    : "discount-badge";

  return <div className={finalClassName}>-{discountPercent}%</div>;
};

export default DiscountBadge;
