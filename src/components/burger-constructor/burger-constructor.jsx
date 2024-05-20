import React, { useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorSyles from "./burger-constructor.module.css";
import ingridienticon from "../../images/list-icon.png";

function BurgerConstructor({ data }) {
  const [ingredients] = useState(data);

  const bun = ingredients.find((item) => item.type === "bun");

  const total = ingredients.reduce(
    (acc, item) => acc + item.price,
    bun ? bun.price * 2 : 0
  );

  const nonBunIngredients = ingredients.filter((item) => item.type !== "bun");

  return (
    <div className={ConstructorSyles.container + " mt-25 ml-16"}>
      <div className={ConstructorSyles.bunTop}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

      <div className={`${ConstructorSyles.scrollable} container`}>
  {nonBunIngredients.map((ingredient) => (
    <div className={ConstructorSyles.ingredientRow} key={ingredient._id}>
      <img src={ingridienticon} className={ConstructorSyles.ingredientIcon} alt="Ingredient" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  ))}
</div>

      <div className={ConstructorSyles.bunBottom}>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

      <div className={ConstructorSyles.total}>
        <p className={ConstructorSyles.price}>
          <span className={ConstructorSyles.priceSpan}>Итого:</span>
          <CurrencyIcon type="primary" />
          <span className={ConstructorSyles.totalSpan}>{total}</span>
        </p>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
