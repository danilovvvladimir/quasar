import { FC } from "react";
import "./RegisterPage.scss";
import RegisterForm from "@/components/AuthForm/RegisterForm";

const RegisterPage: FC = () => {
  return (
    <div className="auth-page">
      <h1 className="title auth-page__title">Регистрация</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
