import { FC } from "react";
import "./LoginPage.scss";
import LoginForm from "@/components/AuthForm/LoginForm";

const LoginPage: FC = () => {
  return (
    <div className="auth-page">
      <h1 className="title auth-page__title">Авторизация</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
