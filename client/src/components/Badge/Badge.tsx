import { FC } from "react";
import styles from "./Badge.module.scss";
import classNames from "classnames";

interface BadgeProps {
  quantity: number;
  className?: string;
}

const Badge: FC<BadgeProps> = ({ quantity, className }) => {
  const finalClassName = classNames(styles["badge"], className);

  return <div className={finalClassName}>{quantity}</div>;
};

export default Badge;
