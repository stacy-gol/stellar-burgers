import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const onClick = (path) => {
    navigate(path);
  };

  return (
    <header className={headerStyles.header}>
      <section className={headerStyles.content}>
        <nav className={headerStyles.navbar}>
          <button
            className={headerStyles.navButton}
            type="button"
            onClick={() => onClick("/")}
          >
            <BurgerIcon type={currentPath === "/" ? "primary" : "secondary"} />
            <p
              className={`${"text text_type_main-default"} ${
                currentPath === "/"
                  ? headerStyles.active
                  : headerStyles.inactive
              }`}
            >
              Конструктор
            </p>
          </button>
          <button
            className={headerStyles.navButton}
            type="button"
            onClick={() => onClick("/feed")}
          >
            <ListIcon
              type={currentPath === "/feed" ? "primary" : "secondary"}
            />
            <p
              className={`${"text text_type_main-default"} ${
                currentPath === "/feed"
                  ? headerStyles.active
                  : headerStyles.inactive
              }`}
            >
              Лента заказов
            </p>
          </button>
        </nav>
        <Logo />
        <button
          className={headerStyles.loginButton}
          type="button"
          onClick={() => onClick("/profile")}
        >
          <ProfileIcon
            type={currentPath.startsWith("/profile") ? "primary" : "secondary"}
          />
          <p
            className={`${"text text_type_main-default"} ${
              currentPath.startsWith("/login" || "/profile")
                ? headerStyles.active
                : headerStyles.inactive
            }`}
          >
            Личный кабинет
          </p>
        </button>
      </section>
    </header>
  );
}

export default Header;
