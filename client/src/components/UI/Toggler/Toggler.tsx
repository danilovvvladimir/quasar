"use client";

import { FC, useState } from "react";
import "./Toggler.scss";

interface TogglerProps {
  isToggle: boolean;
  onToggle: (toggle: boolean) => void;
}

const Toggler: FC<TogglerProps> = ({ onToggle, isToggle }) => {
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
      ></input>
      <span className="custom-toggler__thumb"></span>
    </label>
  );
};

export default Toggler;
