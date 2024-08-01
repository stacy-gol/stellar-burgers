import React from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyles from "./order-card.module.css";
import { useSelector } from "../../services/store";
import { OrderDetail } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { selectAllIngredients } from "../../services/ingredients/ingredientsSlice";

interface OrderCardProps {
  order: OrderDetail;
}

function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate();
  const allIngredients = useSelector(selectAllIngredients);

  const orderIngredients = order.ingredients.map((id) => {
    return allIngredients.find((ingredient) => ingredient._id === id);
  });

  const totalPrice = orderIngredients.reduce((acc, ingredient) => {
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  const ingredientImages = orderIngredients
    .slice(0, 6)
    .map((ingredient, index: number) => (
      <div
        key={index}
        className={`${orderCardStyles.ingredientImageWrapper} ${
          index === 5 && orderIngredients.length > 6 ? orderCardStyles.lastIngredient : ""
        }`}
      >
        {ingredient ? (
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className={orderCardStyles.ingredientImage}
          />
        ) : (
          <div className={orderCardStyles.ingredientImagePlaceholder} />
        )}
        {index === 5 && orderIngredients.length > 6 && (
          <div className={orderCardStyles.ingredientOverlay}>
            <span className={orderCardStyles.ingredientCount}>
              +{orderIngredients.length - 6}
            </span>
          </div>
        )}
      </div>
    ));

  const handleClick = () => {
    navigate(`/feed/${order._id}`, { state: { background: location } });
  };

  return (
    <div onClick={handleClick} className={orderCardStyles.orderCard}>
      <div className={orderCardStyles.orderDetails}>
        <span className={orderCardStyles.orderNumber}>#{order.number}</span>
        <FormattedDate date={new Date(order.createdAt)} />
      </div>
      <div className={orderCardStyles.orderInfo}>
        <h3 className={orderCardStyles.orderName}>{order.name}</h3>
        <div className={orderCardStyles.ingredientImages}>
          {ingredientImages}
        </div>
        <div className={orderCardStyles.orderPrice}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
