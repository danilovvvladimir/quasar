"use client";

import { FC } from "react";
import styles from "./AuthForm.module.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";
import {
  ALREADY_HAS_ACCOUNT_MESSAGE,
  EMAIL_PLACEHOLDER_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
  PASSWORD_PLACEHOLDER_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  REGISTER_MESSAGE,
  USERNAME_PLACEHOLDER_MESSAGE,
  USERNAME_REQUIRED_MESSAGE,
} from "@/constants/messages";
import useRegisterForm from "@/hooks/useRegisterForm";
import { EMAIL_REGEX } from "@/constants/regex";
import classNames from "classnames";

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
      <div
        className={classNames(
          styles["auth-form__controls"],
          styles["auth-form__controls--register"],
        )}
      >
        <Button type="submit">{REGISTER_MESSAGE}</Button>
        <CustomLink href="/auth/login">
          {ALREADY_HAS_ACCOUNT_MESSAGE}
        </CustomLink>
      </div>
    </form>
  );
};

export default RegisterForm;
