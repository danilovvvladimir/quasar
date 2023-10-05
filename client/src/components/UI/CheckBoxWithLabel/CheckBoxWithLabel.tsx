import { FC, useState } from "react";
import styles from "./CheckBoxWithLabel.module.scss";
import Checkbox from "../Checkbox/Checkbox";

interface CheckBoxWithLabelProps {
  isChecked: boolean;
  handleCheckboxChange: () => void;
  labelText: string;
  labelClassName: string;
  onClick?: () => void;
}

const CheckBoxWithLabel: FC<CheckBoxWithLabelProps> = ({
  labelText,
  labelClassName,
  onClick,
  handleCheckboxChange,
  isChecked,
}) => {
  return (
    <label className={labelClassName} onClick={onClick && onClick}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Checkbox checked={isChecked} />
      {labelText}
    </label>
  );
};

export default CheckBoxWithLabel;
