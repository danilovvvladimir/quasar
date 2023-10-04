"use client";

import { FC } from "react";
import "./ProfileNavigationItem.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="profile-navigation-item">
      <Link
        className={`profile-navigation-item__link ${
          pathname === url ? "profile-navigation-item__link--active" : ""
        }`}
        href={url}
      >
        {label}
      </Link>
    </div>
  );
};

export default ProfileNavigationItem;
