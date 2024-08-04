import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { BurgerIngredient, Order } from "../../services/types";
import orderDetailsStyles from "./order-details.module.css";
import { OrderDetail } from "../../services/types";
import { getOrder } from "../../services/order/orderSlice";
import {
  selectOrders,
  selectProfileOrders,
} from "../../services/middleware/orderFeed/selectors";
import { selectAllIngredients } from "../../services/ingredients/ingredientsSlice";

function OrderDetails() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const orders = useSelector(selectOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const ingredients = useSelector(selectAllIngredients);
  const { number } = useParams();
  useEffect(() => {
    if (!number) {
      setLoading(false);
      return;
    }

    const orderNumber = parseInt(number, 10);

    const getOrderDetails = async () => {
      let orderData =
        orders.find((order) => order.number === orderNumber) ||
        profileOrders.find((order) => order.number === orderNumber);
      if (!orderData) {
        const result = await dispatch(getOrder(number));
        if (getOrder.fulfilled.match(result)) {
          orderData = result.payload;
        }
      }
      setOrder(orderData || null);
      setLoading(false);
    };

    getOrderDetails();
  }, [dispatch, number, orders, profileOrders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

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
