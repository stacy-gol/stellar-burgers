import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ForgotPasswordStyles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={ForgotPasswordStyles.container}>
      <h1
        className={`${ForgotPasswordStyles.title} text text_type_main-large mb-6`}
      >
        Восстановление пароля
      </h1>
      <form className={ForgotPasswordStyles.formContainer}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          size="default"
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          Восстановить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
