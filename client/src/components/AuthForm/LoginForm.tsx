"use client";

import { FC } from "react";
import "./AuthForm.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import { ILoginRequest, IRegisterRequest } from "@/types/common";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/store/auth/auth.actions";
import { AppDispatch } from "@/store/store";
import { createNotify, notifyMode } from "@/utils/createNotify";
import { emailRegex } from "@/constants/regex";

const LoginForm: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({ mode: "onChange" });

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
      console.log(error);

      createNotify("Something went wrong...", notifyMode.ERROR);
    }
  };

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
        {errors.email && (
          <div className="auth-form__error">{errors.email.message}</div>
        )}
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
          <div className="auth-form__error">{errors.password.message}</div>
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
