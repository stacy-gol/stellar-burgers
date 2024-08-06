import React from "react";
import orderDetailsStyles from "./order.module.css";
import doneIcon from "../../images/done-icon.gif";
import { RootState, useSelector } from "../../services/store";


const OrderDetails = () => {
  const orderNumber = useSelector((state: RootState) => state.order.order?.number);

  return (
    <div className={orderDetailsStyles.orderDetails}>
      <h1
        className={`${orderDetailsStyles.orderNumber} text text_type_digits-large mt-30 mb-8`}
      >
        {orderNumber || ""}
      </h1>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-medium mb-5`}
      >
        идентификатор заказа
      </p>
      <div className={`${orderDetailsStyles.imageContainer} mb-15`}>
        <img
          src={doneIcon}
          className={orderDetailsStyles.image}
          alt="Картинка успешного завершения заказа"
        />
      </div>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-default mb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.textOrderNumber} text text_type_main-default text_color_inactive mb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
