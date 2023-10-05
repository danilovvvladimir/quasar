import { FC } from "react";
import styles from "./Checkbox.module.scss";
import classNames from "classnames";

interface CheckboxProps {
  checked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ checked }) => {
  return (
    <span
      className={classNames(styles["checkbox"], {
        [styles["checkbox--checked"]]: checked,
      })}
    ></span>
  );
};

export default Checkbox;
