import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ForgotPasswordStyles from "./forgot-password.module.css";
import { sendPasswordResetEmail } from '../../utils/api'; 


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await sendPasswordResetEmail(email);
      if (response.success) {
        navigate("/reset-password", { replace: true });
      }
    } catch (error) {
      console.error('Ошибка восстановления пароля:', error);
    }
  };

  return (
    <div className={ForgotPasswordStyles.container}>
      <main>
      <h1
        className={`${ForgotPasswordStyles.title} text text_type_main-large mb-6`}
      >
        Восстановление пароля
      </h1>
      <form onSubmit={handleSubmit} className={ForgotPasswordStyles.formContainer}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          size="default"
          extraClass="mb-6"
        />
        <Button type="primary" htmlType="submit" size="medium" extraClass="mb-20"  >
          Восстановить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link to="/login">Войти</Link>
        </p>
      </div>
      </main>
    </div>
  );
};
