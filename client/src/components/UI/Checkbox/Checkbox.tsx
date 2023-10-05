import { FC } from "react";
import "./Checkbox.module.scss";

interface CheckboxProps {
  checked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ checked }) => {
  return (
    <span
      className={
        checked ? "custom-checkbox custom-checkbox--checked" : "custom-checkbox"
      }
    ></span>
  );
};

export default Checkbox;
