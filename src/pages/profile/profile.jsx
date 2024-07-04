import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { logoutUser } from "../../services/authSlice";
import { useDispatch } from 'react-redux';
import {
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
          <div className={ProfileStyles.layout}>

        <div className={`${ProfileStyles.navBar} mr-15`}>
          <div className={ProfileStyles.navElement}>
            <NavLink
              end
              to={`/profile`}
              className={({ isActive }) =>
                isActive
                  ? `${ProfileStyles.activeNavElement} text text_type_main-medium`
                  : `${ProfileStyles.navElement} text text_type_main-medium`
              }
            >
              Профиль
            </NavLink>
          </div>
          <div className={ProfileStyles.navElement}>
            <NavLink
              end
              to={`/profile/orders`}
              className={({ isActive }) =>
                isActive
                  ? `${ProfileStyles.activeNavElement} text text_type_main-medium`
                  : `${ProfileStyles.navElement} text text_type_main-medium`
              }
            >
              История заказов
            </NavLink>
          </div>
          <div className={ProfileStyles.navElement}>
            <NavLink
              to="/"
              className={
                ProfileStyles.navElement + " text text_type_main-medium"
              }
              onClick={() => dispatch(logoutUser())}
            >
              Выход
            </NavLink>
          </div>

          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете <br></br> изменить свои персональные данные
          </p>
        </div>
    <div className="mr-60">
      <form className={ProfileStyles.formContainer}>
      <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          icon="EditIcon"
          size="default"
        />
        <Input
          type="email"
          placeholder="Логин"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          size="default"
          icon="EditIcon"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          size="default"
          icon="EditIcon"
          extraClass="mb-6"
        />
      </form>
    </div>
    </div>
    </div>
  );
};
