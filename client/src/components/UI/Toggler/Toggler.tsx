"use client";

import { FC, InputHTMLAttributes, useState } from "react";
import styles from "./Toggler.module.scss";
import classNames from "classnames";

interface TogglerProps extends InputHTMLAttributes<HTMLInputElement> {
  isToggle: boolean;
  onToggleOn?: () => void;
  onToggleOff?: () => void;
  accented?: boolean;
}

const Toggler: FC<TogglerProps> = ({
  isToggle,
  onToggleOn,
  onToggleOff,
  accented,
  ...props
}) => {
  const [isTogglerOn, setIsTogglerOn] = useState<boolean>(isToggle);

  const handleTogglerChange = () => {
    setIsTogglerOn((prevIsTogglerOn) => {
      const newIsTogglerOn = !prevIsTogglerOn;

      if (newIsTogglerOn && onToggleOn) {
        onToggleOn();
      }

      if (!newIsTogglerOn && onToggleOff) {
        onToggleOff();
      }

      return newIsTogglerOn;
    });
  };

  return (
    <label
      className={classNames(styles["custom-toggler"], {
        [styles["custom-toggler--on"]]: isTogglerOn,
        [styles["custom-toggler--accented"]]: accented,
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
