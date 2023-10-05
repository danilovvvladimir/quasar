import { FC, useState } from "react";
import styles from "./CheckBoxWithLabel.module.scss";
import Checkbox from "../Checkbox/Checkbox";

interface CheckBoxWithLabelProps {
  labelText: string;
  labelClassName: string;
}

const CheckBoxWithLabel: FC<CheckBoxWithLabelProps> = ({
  labelText,
  labelClassName,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={labelClassName}>
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span
        className={
          checked
            ? "custom-checkbox custom-checkbox--checked"
            : "custom-checkbox"
        }
      ></span>
      <Checkbox checked={checked} />
      {labelText}
    </label>
  );
};

export default CheckBoxWithLabel;
