"use client";

import { FC, useEffect } from "react";
import "./Navbar.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../UI/Button/Button";
import Separator from "../Separator/Separator";
import CustomLink from "../CustomLink/CustomLink";
import NavigationItem from "./NavigationItem/NavigationItem";
import { useSelector } from "react-redux";
import { checkIsAuth } from "@/store/auth/auth.slice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/store/auth/auth.actions";

const Navbar: FC = () => {
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAuth());
    }
    console.log("isAuth", isAuth);
  }, []);

  return (
    <header className="header">
      <Link href="/" className="logo">
        <Image src="/logo.svg" alt="logo" width={150} height={48} />
      </Link>
      {isAuth ? (
        <nav className="navigation">
          <NavigationItem
            href="/admin/statistics"
            iconName="admin"
            text="Управление"
          />
          <NavigationItem href="/wishlist" iconName="heart" text="Избранное" />
          <NavigationItem href="/cart" iconName="cart" text="Корзина" />
          <NavigationItem href="/profile/info" iconName="user" text="Профиль" />
        </nav>
      ) : (
        <div className="header__controls">
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
