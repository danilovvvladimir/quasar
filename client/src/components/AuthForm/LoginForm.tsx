"use client";

import { FC } from "react";
import "./AuthForm.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import { ILoginRequest, IRegisterRequest } from "@/types/common";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/store/auth/auth.actions";
import { AppDispatch } from "@/store/store";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { emailRegex } from "@/constants/regex";
import { checkIsAuth } from "@/store/auth/auth.slice";
import ErrorValidationText from "../ErrorValidationText/ErrorValidationText";

const LoginForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({ mode: "onChange" });
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginRequest> = async (values) => {
    try {
      const response = await dispatch(loginUser(values));

      if (loginUser.rejected.match(response)) {
        if (axios.isAxiosError(response.payload)) {
          createNotify(
            response.payload.response?.data?.message,
            notifyMode.ERROR,
          );
        }
      } else {
        reset();
        createNotify("You are successfully authorized!");
        router.push("/");
      }
    } catch (error) {
      createNotify("Something went wrong...", notifyMode.ERROR);
    }
  };

  if (isAuth) {
    redirect("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className="auth-form__inputs">
        <input
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: { value: emailRegex, message: "Invalid email!" },
          })}
          type="text"
          className="auth-form__input"
          placeholder="Email..."
        />

        {errors.email && <ErrorValidationText text={errors.email.message!} />}
        <input
          {...register("password", {
            required: { value: true, message: "Password is required" },
            min: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
          })}
          type="text"
          className="auth-form__input"
          placeholder="Password..."
        />

        {errors.password && (
          <ErrorValidationText text={errors.password.message!} />
        )}
      </div>
      <div className="auth-form__controls">
        <Button>Войти</Button>
        <CustomLink href="/auth/register">Создать аккаунт</CustomLink>
      </div>
    </form>
  );
};

export default LoginForm;
