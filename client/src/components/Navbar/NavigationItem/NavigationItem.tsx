import { FC } from "react";
import "./NavigationItem.scss";
import Link from "next/link";
import getIconByName from "@/utils/getIconByName";

interface NavigationItemProps {
  iconName: string;
  text: string;
  href: string;
}

const NavigationItem: FC<NavigationItemProps> = ({ href, iconName, text }) => {
  return (
    <Link href={href} className="navigation__item">
      {/* <Image src="/user.svg" alt="logo" width={24} height={24} /> */}
      {getIconByName(iconName)}
      <div className="navigation__item-text">{text}</div>
    </Link>
  );
};

export default NavigationItem;
