import { ButtonHTMLAttributes, FC } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isInverted?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isInverted = false,
  ...props
}) => {
  const finalClassName = className
    ? `button ${isInverted && "button--inverted"} ${className}`
    : `button ${isInverted && "button--inverted"}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
