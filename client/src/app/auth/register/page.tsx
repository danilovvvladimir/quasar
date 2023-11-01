import { FC } from "react";
import styles from "./LoginPage.module.scss";
import RegisterForm from "@/components/AuthForm/RegisterForm";
import { Metadata } from "next";
import classNames from "classnames";
import {
  REGISTER_PAGE_METADATA_DESCRIPTION,
  REGISTER_PAGE_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata: Metadata = {
  title: REGISTER_PAGE_METADATA_TITLE,
  description: REGISTER_PAGE_METADATA_DESCRIPTION,
};

const RegisterPage: FC = () => {
  return (
    <div className={styles["auth-page"]}>
      <h1 className={classNames("title", styles["auth-page__title"])}>
        Регистрация
      </h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
