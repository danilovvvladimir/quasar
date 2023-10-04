import { FC } from "react";
import styles from "./CustomLink.module.scss";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  isButton?: boolean;
  className?: string;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  isButton = false,
  className,
  children,
}) => {
  if (isButton) {
    const finalClassName = classNames(styles["link-button"], className);

    return (
      <Link className={finalClassName} href={href}>
        {children}
      </Link>
    );
  }

  const finalClassName = className ? `link ${className}` : "link";

  return (
    <Link className={`link ${finalClassName}`} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
