import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyles from "./order-card.module.css";
import { RootState, useSelector } from "../../services/store";
import { OrderDetail } from "../../services/types";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  order: OrderDetail;
}

function OrderCard({ order }: OrderCardProps) {
  const ingredients = useSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );
  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const { orders } = useSelector((store) => ({
    orders: store.orderFeed.orders,
  }));
  const location = useLocation();
  const navigate = useNavigate();

  const orderIngredients = order.ingredients.map((id) => {
    return ingredients.find((ingredient) => ingredient._id === id) || bun;
  });

  const totalPrice = orderIngredients.reduce((acc, ingredient) => {
    return acc + (ingredient ? ingredient.price : 0);
  }, 0);

  const ingredientImages = orderIngredients
    .slice(0, 6)
    .map((ingredient, index: number) => (
      <div key={index} className={orderCardStyles.ingredientImageWrapper}>
        <img
          src={ingredient?.image}
          alt={ingredient?.name}
          className={orderCardStyles.ingredientImage}
        />
      </div>
    ));

  const handleClick = () => {
    navigate(`/feed/${order._id}`, { state: { background: location } });
  };

  return (
    <div onClick={handleClick} className={orderCardStyles.orderCard}>
      <div className={orderCardStyles.orderDetails}>
        <span className={orderCardStyles.orderNumber}>#{order.number}</span>
        <span className={orderCardStyles.orderDate}>
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
      <div className={orderCardStyles.orderInfo}>
        {/* <h3 className={orderCardStyles.orderName}>{order.name}</h3> */}
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
