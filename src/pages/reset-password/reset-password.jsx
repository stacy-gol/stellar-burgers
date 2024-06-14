import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ResetPasswordStyles from "./reset-password.module.css";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className={ResetPasswordStyles.container}>
      <h1
        className={`${ResetPasswordStyles.title} text text_type_main-large mb-6`}
      >
        Восстановление пароля
      </h1>
      <form className={ResetPasswordStyles.formContainer}>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name="code"
          size="default"
        />
        <Button type="primary" size="medium" extraClass="mt-6 mb-20">
          Сохранить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
