"use client";

import { FC } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Separator from "../Separator/Separator";
import CustomLink from "../CustomLink/CustomLink";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useSelector } from "react-redux";
import { checkIsAuth } from "@/store/auth/auth.slice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth/auth.actions";
import getIconByName from "@/utils/getIconByName";
import { createNotify, notifyMode } from "@/utils/createNotify";
import Badge from "../Badge/Badge";

const Navbar: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    createNotify("Вы успешно вышли из аккаунта", notifyMode.SUCCESS);
    dispatch(logoutUser());
  };

  return (
    <header className={styles["header"]}>
      <Link href="/" className="logo">
        <Image src="/logo.svg" alt="logo" width={150} height={48} />
      </Link>
      {isAuth ? (
        <nav className={styles["navigation"]}>
          {user.role !== "USER" && (
            <NavigationItem
              href="/admin/statistics"
              iconName="admin"
              text="Управление"
            />
          )}

          <div className={styles["navigation__block"]}>
            <NavigationItem
              href="/wishlist"
              iconName="heart"
              text="Избранное"
            />
            {user.wishlistItem.length > 0 && (
              <Badge
                className={styles["navigation__block-badge"]}
                quantity={user.wishlistItem.length}
              />
            )}
          </div>
          <div className={styles["navigation__block"]}>
            <NavigationItem href="/cart" iconName="cart" text="Корзина" />
            {user.cartItem.length > 0 && (
              <Badge
                className={styles["navigation__block-badge"]}
                quantity={user.cartItem.length}
              />
            )}
          </div>
          <NavigationItem href="/profile/info" iconName="user" text="Профиль" />

          <button
            className={styles["navigation__logout"]}
            onClick={handleLogout}
          >
            {getIconByName("cross")}
            <div className={styles["navigation__logout-text"]}>Выйти</div>
          </button>
        </nav>
      ) : (
        <div className={styles["header__controls"]}>
          <CustomLink href="/auth/login">Войти</CustomLink>
          <CustomLink isButton={true} href="/auth/register">
            Создать аккаунт
          </CustomLink>
        </div>
      )}
      <Separator />
    </header>
  );
};

export default Navbar;
