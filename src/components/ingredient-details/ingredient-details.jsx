import React from "react";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";

function IngredientDetails({ currentIngredient }) {
  return (
    <div>
      <img
        className={burgerIngredientsStyles.modalImage}
        src={currentIngredient.image_large}
        alt="Картинка ингредиента"
      />
      <p
        className={`${burgerIngredientsStyles.modalText} text text_type_main-medium mb-8 mt-4`}
      >
        {currentIngredient.name}
      </p>
      <ul
        className={`${burgerIngredientsStyles.modalList} text text_type_main-default text_color_inactive mb-15`}
      >
        <li className="ml-5">
          Калории, ккал
          <br />
          {currentIngredient.calories}
        </li>
        <li className="ml-5">
          Белки, г<br />
          {currentIngredient.proteins}
        </li>
        <li>
          Жиры, г<br />
          {currentIngredient.fat}
        </li>
        <li className="mr-5">
          Углеводы, г<br />
          {currentIngredient.carbohydrates}
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
