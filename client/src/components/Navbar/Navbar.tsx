"use client";

import { FC, useEffect, useState } from "react";
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
import { checkAuth, logoutUser } from "@/store/auth/auth.actions";
import getIconByName from "@/utils/getIconByName";
import { createNotify, notifyMode } from "@/utils/createNotify";
import Loader from "../Loader/Loader";

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

          <NavigationItem href="/wishlist" iconName="heart" text="Избранное" />
          <NavigationItem href="/cart" iconName="cart" text="Корзина" />
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
