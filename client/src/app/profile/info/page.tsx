"use client";

import { FC, useEffect, useState } from "react";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Image from "next/image";
import styles from "../ProfilePage.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { register } from "module";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorValidationText from "@/components/ErrorValidationText/ErrorValidationText";
import {
  EMAIL_REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  NAME_REQUIRED_MESSAGE,
} from "@/constants/validation";
import { EMAIL_REGEX } from "@/constants/regex";
import {
  EMAIL_PLACEHOLDER_MESSAGE,
  ERROR_NOTIFY_MESSAGE,
} from "@/constants/messages";
import { createNotify, notifyMode } from "@/utils/createNotify";
import UserService from "@/services/user";

interface UpdateProfileValues {
  username: string;
  email: string;
  password?: string;
}

interface ProfileInfoPageProps {}

const ProfileInfoPage: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState<UpdateProfileValues>({
    email: user!.email,
    username: user!.username,
  });

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    getFieldState,

    formState: { errors },
  } = useForm<UpdateProfileValues>({
    mode: "onChange",
    defaultValues: {
      email: user!.email,
      username: user!.username,
    },
  });

  const userService = new UserService();

  const onSubmit: SubmitHandler<UpdateProfileValues> = async (values) => {
    try {
      const { email, username, password } = values;
      await userService.update({ email, username, password });

      console.log(values);
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
        alt={`${user!.username} profile image`}
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
      </div>
      <div className={styles["profile-info__disclaimer"]}>
        Имя на QUASAR – публичное имя вашего аккаунта. Оно отображается в ваших
        отзывах, комментариях, оценках или ответах. Если вы измените его, новое
        имя появится не только в новом, но и в старом контенте.
      </div>
      <Button
        disabled={
          user?.username === formData.username && user?.email === formData.email
        }
        className={styles["profile-info__button"]}
      >
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileInfoPage;
