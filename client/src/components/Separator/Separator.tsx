import { FC } from "react";
import styles from "./Separator.module.scss";
import classNames from "classnames";

interface SeparatorProps {
  className?: string;
}

const Separator: FC<SeparatorProps> = ({ className }) => {
  const finalClassName = classNames(styles["separator"], className);

  return <div className={finalClassName} />;
};

export default Separator;
