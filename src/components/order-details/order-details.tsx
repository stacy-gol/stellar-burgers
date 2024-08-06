import React from "react";
import { BurgerIngredient, OrderDetail } from "../../services/types";
import orderDetailsStyles from "./order-details.module.css";
import { useSelector } from "../../services/store";
import { selectAllIngredients } from "../../services/ingredients/ingredientsSlice";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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
    .filter((ingredient: BurgerIngredient | null): ingredient is BurgerIngredient => ingredient !== null);

  const ingredientCount = order.ingredients.reduce(
    (acc: { [id: string]: number }, id: string) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {}
  );

  const uniqueOrderIngredients = Array.from(
    new Set(orderIngredients.map((ingredient) => ingredient._id))
  ).map((id) => orderIngredients.find((ingredient) => ingredient._id === id));

  const totalPrice = orderIngredients.reduce((acc, ingredient) => {
    return (
      acc +
      (ingredient
        ? ingredient.price * (ingredientCount[ingredient._id] || 0)
        : 0)
    );
  }, 0);

  return (
    <div className={`${orderDetailsStyles.container} mt-10`}>
      <p
        className={`text text_type_digits-default mb-4 ${orderDetailsStyles.header}`}
      >
        #{order.number}
      </p>
      <h1 className="text text_type_main-medium">{order.name}</h1>
      <div className={orderDetailsStyles.ingredients}>
        {uniqueOrderIngredients.map((ingredient, index) => (
          <div key={index} className={orderDetailsStyles.ingredient}>
            <img src={ingredient?.image_mobile} alt={ingredient?.name} />
            <p>{ingredient?.name}</p>
            <div className={orderDetailsStyles.price}>
              <span>
                {ingredientCount[ingredient!._id]} x {ingredient?.price}
              </span>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        ))}
      </div>
      <div className={orderDetailsStyles.total}>
        <span>Total:</span>
        <div className={orderDetailsStyles.price}>
          <span>{totalPrice}</span>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
