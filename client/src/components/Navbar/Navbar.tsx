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
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAuth()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    createNotify("Вы успешно вышли из аккаунта", notifyMode.SUCCESS);
    dispatch(logoutUser());
  };

  console.log("user", user);

  return (
    <header className={styles["header"]}>
      <Link href="/" className="logo">
        <Image src="/logo.svg" alt="logo" width={150} height={48} />
      </Link>
      {isLoading ? (
        <Loader />
      ) : isAuth ? (
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
