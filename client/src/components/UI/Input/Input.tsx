"use client";

import { InputHTMLAttributes, FC } from "react";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, children, ...props }) => {
  const finalClassName = className ? `input ${className}` : "input";

  return <input {...props} className={finalClassName} />;
};

export default Input;
