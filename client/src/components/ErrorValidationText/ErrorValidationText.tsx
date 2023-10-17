import { FC } from "react";
import styles from "./ErrorValidationText.module.scss";
import classNames from "classnames";

interface ErrorValidationTextProps {
  text: string;
  className?: string;
}

const ErrorValidationText: FC<ErrorValidationTextProps> = ({
  text,
  className,
}) => {
  const finalClassName = classNames(styles["error-validation"], className);

  return <div className={finalClassName}>{text}</div>;
};

export default ErrorValidationText;
