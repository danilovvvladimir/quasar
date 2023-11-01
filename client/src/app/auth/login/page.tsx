import { FC } from "react";
import styles from "./LoginPage.module.scss";
import LoginForm from "@/components/AuthForm/LoginForm";
import { Metadata } from "next";
import {
  LOGIN_PAGE_METADATA_DESCRIPTION,
  LOGIN_PAGE_METADATA_TITLE,
} from "@/constants/metadata";
import classNames from "classnames";

export const metadata: Metadata = {
  title: LOGIN_PAGE_METADATA_TITLE,
  description: LOGIN_PAGE_METADATA_DESCRIPTION,
};

const LoginPage: FC = () => {
  return (
    <div className={styles["auth-page"]}>
      <h1 className={classNames("title", styles["auth-page__title"])}>
        Авторизация
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
