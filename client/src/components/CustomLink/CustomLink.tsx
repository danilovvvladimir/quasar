import { FC } from "react";
import "./CustomLink.scss";
import Link, { LinkProps } from "next/link";

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
  const extraClassname = className ? className : "";

  if (isButton) {
    return (
      <Link className={`link--button ${extraClassname}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <Link className={`link ${extraClassname}`} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
