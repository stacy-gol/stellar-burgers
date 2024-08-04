import React from "react";
import { BurgerIngredient, OrderDetail } from "../../services/types";
import orderDetailsStyles from "./order-details.module.css";
import { useSelector } from "../../services/store";
import { selectAllIngredients } from "../../services/ingredients/ingredientsSlice";

type OrderDetailsProps = {
  order: OrderDetail;
};

function OrderDetails({ order }: OrderDetailsProps) {
  const ingredients = useSelector(selectAllIngredients);

  const orderIngredients = order.ingredients
    .map((ingredientId: string) => {
      return (
        ingredients.find(
          (ingredient: BurgerIngredient) => ingredient._id === ingredientId
        ) || null
      );
    })
    .filter((ingredient: BurgerIngredient | null) => ingredient !== null);

  const totalPrice = orderIngredients.reduce((acc, ingredient) => {
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  return (
    <div className={orderDetailsStyles.container}>
      <h1 className="text text_type_main-large mb-4">Order #{order.number}</h1>
      <div className={orderDetailsStyles.ingredients}>
        {orderIngredients.map((ingredient, index) => (
          <div key={index} className={orderDetailsStyles.ingredient}>
            <img src={ingredient?.image_mobile} alt={ingredient?.name} />
            <p>{ingredient?.name}</p>
            <p>{ingredient?.price}</p>
          </div>
        ))}
      </div>
      <div className={orderDetailsStyles.total}>
        <span>Total:</span>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
}

export default OrderDetails;