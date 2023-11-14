"use client";

import { FC } from "react";
import styles from "./AuthForm.module.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";

import useRegisterForm from "@/hooks/useRegisterForm";
import { EMAIL_REGEX } from "@/constants/regex";
import classNames from "classnames";
import {
  USERNAME_PLACEHOLDER_MESSAGE,
  EMAIL_PLACEHOLDER_MESSAGE,
  PASSWORD_PLACEHOLDER_MESSAGE,
} from "@/constants/messages";
import {
  USERNAME_REQUIRED_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
} from "@/constants/validation";

const RegisterForm: FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["auth-form"]}>
      <div className={styles["auth-form__inputs"]}>
        <input
          {...register("username", {
            required: { value: true, message: USERNAME_REQUIRED_MESSAGE },
          })}
          type="text"
          className={styles["auth-form__input"]}
          placeholder={USERNAME_PLACEHOLDER_MESSAGE}
        />

        {errors.username && (
          <ErrorValidationText text={errors.username.message!} />
        )}

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
            minLength: {
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
      <div
        className={classNames(
          styles["auth-form__controls"],
          styles["auth-form__controls--register"],
        )}
      >
        <Button type="submit">Зарегистрироваться</Button>
        <CustomLink href="/auth/login">Уже есть аккаунт</CustomLink>
      </div>
    </form>
  );
};

export default RegisterForm;
