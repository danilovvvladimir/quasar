import { FC } from "react";
import "./AuthForm.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import Input from "../UI/Input/Input";

const LoginForm: FC = () => {
  return (
    <form className="auth-form">
      <div className="auth-form__inputs">
        <Input placeholder="Введите email..." />
        <Input placeholder="Введите пароль..." />
      </div>
      <div className="auth-form__controls">
        <Button>Войти</Button>
        <CustomLink href="/auth/register">Создать аккаунт</CustomLink>
      </div>
    </form>
  );
};

export default LoginForm;
