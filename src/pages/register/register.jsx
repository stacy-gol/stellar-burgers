import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterStyles from "./register.module.css";

export const Register = () => {
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={RegisterStyles.registerContainer}>
      <h1
        className={`${RegisterStyles.registerTitle} text text_type_main-large mb-6`}
      >
        Регистрация
      </h1>
      <form className={RegisterStyles.formContainer}>
      <Input
          type="name"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          size="default"
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          size="default"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          Зарегистрироваться
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};
