import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HomeStyles from "./home.module.css";

export function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <main className={HomeStyles.home}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    </DndProvider>
  );
}
