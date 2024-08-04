import { useCallback, useEffect } from "react";
import feedStyles from "./feed.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "../../services/store";
import {
  wsConnect,
  wsDisconnect,
} from "../../services/middleware/orderFeed/order-feed-actions";
import OrderCard from "../../components/order-card/order-card";
import { selectOrders } from "../../services/middleware/orderFeed/selectors";
import { OrderDetail } from "../../services/types";
import { useLocation, useNavigate } from "react-router-dom";
import { openOrderFeedModal } from "../../services/modal/modalSlice";

export function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useSelector(selectOrders);

  const isDoneToday = orders.reduce(
    (acc, order) => acc + (order.status === "done" ? 1 : 0),
    0
  );
  const isDoneAllTime = orders.length;

  const readyOrderNumbers = () => {
    return orders
      .slice(0, 5)
      ?.filter((order) => order.status === "done")
      .map((order) => (
        <p className="text text_type_digits-default mb-2 mr-4" key={uuidv4()}>
          {order.number}
        </p>
      ));
  };

  const inProgressOrderNumbers = () => {
    return orders
      .slice(0, 5)
      ?.filter((order) => order.status !== "done")
      .map((order) => (
        <p className="text text_type_digits-default mb-2 mr-4" key={uuidv4()}>
          {order.number}
        </p>
      ));
  };

  const handleOpenOrderCard = useCallback(
    (order: OrderDetail) => {
      dispatch(openOrderFeedModal(order));
      navigate(`/feed/${order.number.toString()}`, {
        state: { backgroundLocation: location.pathname },
      });
    },
    [dispatch, navigate, location]
  );

  return (
    <>
      <div className={feedStyles.content}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={feedStyles.container}>
          <div className={feedStyles.contentleft}>
            <div className={feedStyles.orderContainer}>
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={() => handleOpenOrderCard(order)}
                />
              ))}
            </div>
          </div>
          <div className={feedStyles.contentleft}>
            <div className={feedStyles.status + " mb-15"}>
              <div className={feedStyles.done}>
                <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                <div className={feedStyles.statusContainer}>
                  {readyOrderNumbers()}
                </div>
              </div>
              <div className={feedStyles.inProgress}>
                <div className={feedStyles.done}>
                  <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                  <div className={feedStyles.statusContainer}>
                    {inProgressOrderNumbers()}
                    <div className="mb-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text text_type_main-large">
              Выполнено за всё время:
            </h2>
            <p className="text text_type_digits-large mb-15">{isDoneAllTime}</p>
            <h2 className="text text_type_main-large">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{isDoneToday}</p>
          </div>
        </div>
      </div>
    </>
  );
}
