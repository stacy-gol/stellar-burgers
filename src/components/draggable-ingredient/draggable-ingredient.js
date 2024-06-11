import { useDrag } from "react-dnd";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { draggableIngredientTypes } from "../../utils/types";


function DraggableIngredient({ ingredient, onClick, orderCount }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "ingredient",
    item: { ...ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={burgerIngredientsStyles.ingredient}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onClick(ingredient)}
    >
      {orderCount > 0 && <Counter count={orderCount} size="default" />}
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={burgerIngredientsStyles.ingredientImage}
      />
      <p className={burgerIngredientsStyles.ingredientPrice}>
        {ingredient.price} ₽
      </p>
      <p className={burgerIngredientsStyles.ingredientName}>
        {ingredient.name}
      </p>
    </div>
  );
}

DraggableIngredient.propTypes = draggableIngredientTypes;


export default DraggableIngredient;
