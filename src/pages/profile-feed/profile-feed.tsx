import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import {
  wsConnect,
  wsDisconnect,
} from "../../services/middleware/profileFeed/profile-feed-actions";
import OrderCard from "../../components/order-card/order-card";
import { selectProfileOrders } from "../../services/middleware/orderFeed/selectors";
import { OrderDetail } from "../../services/types";
import profileFeedStyles from "./profile-feed.module.css";
import { getCookie } from "../../utils/cookies";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authSlice";
import { openOrderFeedModal } from "../../services/modal/modalSlice";

export function ProfileFeed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
      dispatch(wsConnect(wsUrl));
    }
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const profileOrders = useSelector(selectProfileOrders);

  const handleLogout = async () => {
    //@ts-ignore
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate("/");
    } else {
    }
  };

  const handleOpenOrderCard = useCallback(
    (order: OrderDetail) => {
      dispatch(openOrderFeedModal(order));
      navigate(`/profile/orders/${order.number.toString()}`, {
        state: { backgroundLocation: location.pathname },
      });
    },
    [dispatch, navigate, location]
  );

  return (
    <div className={profileFeedStyles.layout}>
      <div className={`${profileFeedStyles.navBar} mr-15`}>
        <div className={profileFeedStyles.navElement}>
          <NavLink
            end
            to={`/profile`}
            className={({ isActive }) =>
              isActive
                ? `${profileFeedStyles.activeNavElement} text text_type_main-medium`
                : `${profileFeedStyles.navElement} text text_type_main-medium`
            }
          >
            Профиль
          </NavLink>
        </div>
        <div className={profileFeedStyles.navElement}>
          <NavLink
            end
            to={`/profile/orders`}
            className={({ isActive }) =>
              isActive
                ? `${profileFeedStyles.activeNavElement} text text_type_main-medium`
                : `${profileFeedStyles.navElement} text text_type_main-medium`
            }
          >
            История заказов
          </NavLink>
        </div>
        <div className={profileFeedStyles.navElement}>
          <NavLink
            to={`/`}
            className={
              profileFeedStyles.navElement + " text text_type_main-medium"
            }
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </div>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете <br></br> посмотреть свою историю заказов
        </p>
      </div>
      <div className={profileFeedStyles.content}>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <div className={profileFeedStyles.container}>
          <div className={profileFeedStyles.contentleft}>
            <div className={profileFeedStyles.orderContainer}>
              {profileOrders.map((order: OrderDetail) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={() => handleOpenOrderCard(order)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
