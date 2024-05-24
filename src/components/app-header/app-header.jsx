import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
const constructorStyle = {
  color: "#F2F2F3",
};
const buttonsStyle = {
  color: "#8585AD",
};

function Header() {
  return (
    <header className={headerStyles.header}>
      <section className={headerStyles.content}>
        <nav className={headerStyles.navbar}>
          <button className={headerStyles.navButton} type="button">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default" style={constructorStyle}>
              Конструктор
            </p>
          </button>
          <button className={headerStyles.navButton} type="button">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default" style={buttonsStyle}>
              Лента заказов
            </p>
          </button>
        </nav>
        <Logo />
        <button className={headerStyles.loginButton} type="button">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default" style={buttonsStyle}>
            Личный кабинет
          </p>
        </button>
      </section>
    </header>
  );
}

export default Header;
