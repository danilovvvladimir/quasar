"use client";

import { FC, InputHTMLAttributes, useState } from "react";
import "./Toggler.scss";

interface TogglerProps extends InputHTMLAttributes<HTMLInputElement> {
  isToggle: boolean;
  onToggle: (toggle: boolean) => void;
}

const Toggler: FC<TogglerProps> = ({ onToggle, isToggle, ...props }) => {
  const [isTogglerOn, setIsTogglerOn] = useState<boolean>(isToggle);

  const handleTogglerChange = () => {
    onToggle(!isTogglerOn);
    setIsTogglerOn(!isTogglerOn);
  };

  return (
    <label
      className={
        isTogglerOn ? "custom-toggler custom-toggler--on" : "custom-toggler "
      }
    >
      <input
        className="checkbox"
        type="checkbox"
        checked={isTogglerOn}
        onChange={handleTogglerChange}
        {...props}
      ></input>
      <span className="custom-toggler__thumb"></span>
    </label>
  );
};

export default Toggler;
