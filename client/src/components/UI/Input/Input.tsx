"use client";

import { InputHTMLAttributes, FC } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, children, ...props }) => {
  const finalClassName = classNames(styles["input"], className);

  return <input {...props} className={finalClassName} />;
};

export default Input;
