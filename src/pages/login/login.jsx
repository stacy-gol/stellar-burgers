import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/authSlice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(({payload}) => {
      if (payload && payload.isAuthenticated) {
        navigate('/');
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          size="default"
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mt-6 mb-6"
        />
        <Button type="primary" htmlType="submit" size="medium" extraClass="mb-20">
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
