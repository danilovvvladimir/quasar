import { FC } from "react";
import "./AuthForm.scss";
import Button from "../UI/Button/Button";
import CustomLink from "../CustomLink/CustomLink";
import Input from "../UI/Input/Input";

const RegisterForm: FC = () => {
  return (
    <form className="auth-form">
      <div className="auth-form__inputs">
        <Input placeholder="Введите email..." />
        <Input placeholder="Введите username..." />
        <Input placeholder="Введите пароль..." />
      </div>
      <div className="auth-form__controls auth-form__controls--register">
        <Button>Зарегистрироваться</Button>
        <CustomLink href="/auth/login">Уже есть аккаунт</CustomLink>
      </div>
    </form>
  );
};

export default RegisterForm;
