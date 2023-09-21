import { FC, useState } from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  labelText: string;
  labelClassName: string;
}

const Checkbox: FC<CheckboxProps> = ({ labelText, labelClassName }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={labelClassName}>
      <input
        className="checkbox"
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
      {labelText}
    </label>
  );
};

export default Checkbox;
