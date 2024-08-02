import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import {
  wsConnect,
  wsDisconnect,
} from "../../services/middleware/profileFeed/profile-feed-actions";
import OrderCard from "../../components/order-card/order-card";
import { selectProfileOrders } from "../../services/middleware/orderFeed/selectors";
import { OrderDetail } from "../../services/types";
import profileFeedStyles from "./profile-feed.module.css";


export function ProfileFeed() {
  const dispatch = useDispatch();

  const profileOrders = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(wsConnect("wss://norma.nomoreparties.space/orders"));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  if (!profileOrders) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={profileFeedStyles.content}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={profileFeedStyles.container}>
          <div className={profileFeedStyles.contentleft}>
            <div className={profileFeedStyles.orderContainer}>
              {profileOrders.map((order: OrderDetail) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
