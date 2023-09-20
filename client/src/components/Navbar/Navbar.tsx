import { FC } from "react";
import "./Navbar.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import Separator from "../Separator/Separator";
import CustomLink from "../CustomLink/CustomLink";

const Navbar: FC = () => {
  return (
    <header className="header">
      <Link href="/" className="logo">
        <Image src="/logo.svg" alt="logo" width={150} height={48} />
      </Link>
      <div className="header__controls">
        <Link className="link" href="/auth/login">
          Войти
        </Link>
        {/* <Button>Создать аккаунт</Button> */}
        <CustomLink isButton={true} href="/auth/register">
          Создать аккаунт
        </CustomLink>
      </div>
      <Separator />
    </header>
  );
};

export default Navbar;
