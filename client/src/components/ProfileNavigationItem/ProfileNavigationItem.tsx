"use client";

import { FC } from "react";
import styles from "./ProfileNavigationItem.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface ProfileNavigationItemProps {
  label: string;
  url: string;
}

const ProfileNavigationItem: FC<ProfileNavigationItemProps> = ({
  label,
  url,
}) => {
  const pathname = usePathname();

  return (
    <div className={styles["profile-navigation-item"]}>
      <Link
        className={classNames(styles["profile-navigation-item__link"], {
          [styles["profile-navigation-item__link--active"]]: pathname === url,
        })}
        href={url}
      >
        {label}
      </Link>
    </div>
  );
};

export default ProfileNavigationItem;
