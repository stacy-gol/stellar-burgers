import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={LoginStyles.loginContainer}>
      <h1
        className={`${LoginStyles.loginTitle} text text_type_main-large mb-6`}
      >
        Вход
      </h1>
      <form className={LoginStyles.formContainer}>
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
        <Button type="primary" size="medium" extraClass="mb-20">
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
