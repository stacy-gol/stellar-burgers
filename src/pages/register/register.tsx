import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../../services/authSlice";
import {
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterStyles from "./register.module.css";
import { defaultInputProps } from "../../services/types";
import { useDispatch } from "../../services/store";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 
  

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate(from, { replace: true });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={RegisterStyles.registerContainer}>
      <h1
        className={`${RegisterStyles.registerTitle} text text_type_main-large mb-6`}
      >
        Регистрация
      </h1>
      <form className={RegisterStyles.formContainer} onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleNameChange}
          value={name}
          name="name"
          size="default"
          {...defaultInputProps}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          name="email"
          size="default"
          extraClass="mt-6 mb-6"
          {...defaultInputProps}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          name="password"
          size="default"
          icon="ShowIcon"
          extraClass="mb-6"
          {...defaultInputProps}
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType={"button"}
        >
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
