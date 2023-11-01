"use client";

import { FC } from "react";
import styles from "./AuthForm.module.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import { EMAIL_REGEX } from "@/constants/regex";
import useLoginForm from "@/hooks/useLoginForm";
import {
  EMAIL_PLACEHOLDER_MESSAGE,
  PASSWORD_PLACEHOLDER_MESSAGE,
} from "@/constants/messages";
import {
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
} from "@/constants/validation";

const LoginForm: FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["auth-form"]}>
      <div className={styles["auth-form__inputs"]}>
        <input
          {...register("email", {
            required: { value: true, message: EMAIL_REQUIRED_MESSAGE },
            pattern: { value: EMAIL_REGEX, message: INVALID_EMAIL_MESSAGE },
          })}
          type="text"
          className={styles["auth-form__input"]}
          placeholder={EMAIL_PLACEHOLDER_MESSAGE}
        />

        {errors.email && <ErrorValidationText text={errors.email.message!} />}
        <input
          {...register("password", {
            required: { value: true, message: PASSWORD_REQUIRED_MESSAGE },
            min: {
              value: MIN_PASSWORD_LENGTH,
              message: MIN_PASSWORD_LENGTH_MESSAGE,
            },
          })}
          type="password"
          className={styles["auth-form__input"]}
          placeholder={PASSWORD_PLACEHOLDER_MESSAGE}
        />

        {errors.password && (
          <ErrorValidationText text={errors.password.message!} />
        )}
      </div>
      <div className={styles["auth-form__controls"]}>
        <Button>Войти</Button>
        <CustomLink href="/auth/register">Создать аккаунт</CustomLink>
      </div>
    </form>
  );
};

export default LoginForm;
