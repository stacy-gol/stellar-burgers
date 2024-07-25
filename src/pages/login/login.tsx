import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/authSlice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "./login.module.css";
import { useForm } from "../../hooks/useForm";
import { defaultInputProps } from "../../services/types";

export const Login = () => {
  const { values, handleChange, setValues } = useForm<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(loginUser({ email: values.email, password: values.password })).then(({ payload }) => {
      if (payload && payload.isAuthenticated) {
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div className={LoginStyles.loginContainer}>
      <h1
        className={`${LoginStyles.loginTitle} text text_type_main-large mb-6`}
      >
        Вход
      </h1>
      <form className={LoginStyles.formContainer} onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={values.email}
          name="email"
          size="default"
          {...defaultInputProps}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={values.password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mt-6 mb-6"
          {...defaultInputProps}
        />
        <Button
          type="primary"
          htmlType="submit"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы - новый пользователь?{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};
