import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
import AppStyles from "./app.module.css";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Header />
        <main className={AppStyles.app}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
