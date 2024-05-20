import { useState, useEffect } from "react";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import AppStyles from "./app.module.css";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.data) {
          setIngredients(data.data);
        }
      } catch (error) {
        console.error("Fetching ingredients failed:", error);
      }
    };

    getIngredients();
  }, []); 



  return (
    <div>
      <Header />
      <div className={AppStyles.app}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </div>
    </div>
  );
}

export default App;