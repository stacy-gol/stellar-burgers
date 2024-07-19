import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ResetPasswordStyles from "./reset-password.module.css";
import { resetPassword } from '../../utils/api';
import { defaultInputProps } from "../../services/types";



export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await resetPassword(password, token);
      if (response.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
    }
  }

  return (
    <div className={ResetPasswordStyles.container}>
      <h1
        className={`${ResetPasswordStyles.title} text text_type_main-large mb-6`}
      >
        Восстановление пароля
      </h1>
      <form onSubmit={handleSubmit} className={ResetPasswordStyles.formContainer}>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mt-6 mb-6"
          {...defaultInputProps}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name="token"
          size="default"
          {...defaultInputProps}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
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
