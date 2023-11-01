"use client";

import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./Toggler.module.scss";
import classNames from "classnames";

interface TogglerProps extends InputHTMLAttributes<HTMLInputElement> {
  isToggle: boolean;
  onToggle: (toggle: boolean) => void;
}

const Toggler: FC<TogglerProps> = ({ onToggle, isToggle, ...props }) => {
  const [isTogglerOn, setIsTogglerOn] = useState<boolean>(isToggle);

  const handleTogglerChange = () => {
    setIsTogglerOn(!isTogglerOn);
    onToggle(isTogglerOn);
  };

  return (
    <label
      className={classNames(styles["custom-toggler"], {
        [styles["custom-toggler--on"]]: isTogglerOn,
      })}
    >
      <input
        className="checkbox"
        type="checkbox"
        checked={isTogglerOn}
        onChange={handleTogglerChange}
        {...props}
      ></input>
      <span className={styles["custom-toggler__thumb"]}></span>
    </label>
  );
};

export default Toggler;
