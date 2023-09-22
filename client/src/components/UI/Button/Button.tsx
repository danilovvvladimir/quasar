import { ButtonHTMLAttributes, FC } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const finalClassName = className ? `button ${className}` : "button";

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
