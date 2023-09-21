"use client";

import { FC, useState } from "react";
import "./Toggler.scss";

const Toggler: FC = () => {
  const [isTogglerOn, setIsTogglerOn] = useState<boolean>(false);

  const handleTogglerChange = () => {
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
