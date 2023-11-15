"use client";

import { FC, useEffect, useState } from "react";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Image from "next/image";
import styles from "../ProfilePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorValidationText from "@/components/ErrorValidationText/ErrorValidationText";
import {
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
  NAME_REQUIRED_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
} from "@/constants/validation";
import { EMAIL_REGEX } from "@/constants/regex";
import {
  EMAIL_PLACEHOLDER_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
  PASSWORD_PLACEHOLDER_MESSAGE,
  USER_UPDATE_NOTIFY_MESSAGE,
} from "@/constants/messages";
import { createNotify, notifyMode } from "@/utils/createNotify";
import UserService from "@/services/user";
import { checkAuth } from "@/store/auth/auth.actions";

interface UpdateProfileValues {
  username: string;
  email: string;
  password?: string;
}

interface ProfileInfoPageProps {}

const ProfileInfoPage: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<UpdateProfileValues>({
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileValues>({
    mode: "onChange",
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
  });

  const userService = new UserService();

  const onSubmit: SubmitHandler<UpdateProfileValues> = async (values) => {
    try {
      console.log(values);
      const { email, username, password } = values;
      const updatedUser = await userService.update({
        email,
        username,
        password,
      });

      reset({
        email: updatedUser.email,
        username: updatedUser.username,
        password: "",
      });

      await dispatch(checkAuth());
      createNotify(USER_UPDATE_NOTIFY_MESSAGE, notifyMode.SUCCESS);
    } catch (error) {
      createNotify(ERROR_NOTIFY_MESSAGE, notifyMode.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["profile-info"]}>
      <h1 className={`title ${styles["profile-info__title"]}`}>
        Ваши данные на QUASAR
      </h1>
      <Image
        src="/profile-mock.svg"
        alt={`${user?.username} profile image`}
        width={150}
        height={150}
      />
      <div className={styles["profile-info__inputs"]}>
        <input
          className="input"
          {...register("username", {
            required: {
              value: true,
              message: NAME_REQUIRED_MESSAGE,
            },
          })}
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errors.username && (
          <ErrorValidationText text={errors.username.message!} />
        )}
        <input
          className="input"
          {...register("email", {
            required: { value: true, message: EMAIL_REQUIRED_MESSAGE },
            pattern: { value: EMAIL_REGEX, message: INVALID_EMAIL_MESSAGE },
          })}
          type="text"
          placeholder={EMAIL_PLACEHOLDER_MESSAGE}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {errors.email && <ErrorValidationText text={errors.email.message!} />}
        <input
          {...register("password", {
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: MIN_PASSWORD_LENGTH_MESSAGE,
            },
          })}
          type="password"
          className="input"
          placeholder={PASSWORD_PLACEHOLDER_MESSAGE}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && (
          <ErrorValidationText text={errors.password.message!} />
        )}
      </div>
      <div className={styles["profile-info__disclaimer"]}>
        Имя на QUASAR – публичное имя вашего аккаунта. Оно отображается в ваших
        отзывах, комментариях, оценках или ответах. Если вы измените его, новое
        имя появится не только в новом, но и в старом контенте.
      </div>
      <Button
        disabled={
          user?.username === formData.username &&
          user?.email === formData.email &&
          formData.password === ""
        }
        className={styles["profile-info__button"]}
      >
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileInfoPage;
