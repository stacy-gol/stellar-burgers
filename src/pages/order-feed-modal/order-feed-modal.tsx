import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { useSelector, useDispatch, RootState } from "../../services/store";
import { OrderDetail } from "../../services/types";
import {
  selectOrders,
  selectProfileOrders,
} from "../../services/middleware/orderFeed/selectors";
import { getOrder } from "../../services/order/orderSlice";

export const OrderFeedModal = () => {
  let { number } = useParams<{ number: string }>();

  const orderNumber = number ? parseInt(number, 10) : null;

  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state && location.state.backgroundLocation;

  const orders = useSelector(selectOrders);
  const profileOrders = useSelector(selectProfileOrders);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    const getOrderDetails = async () => {
      let orderData =
        orders.find((order) => order.number === orderNumber) ||
        profileOrders.find((order) => order.number === orderNumber);

      if (!orderData) {
        const result = await dispatch(getOrder(orderNumber.toString()));
        if (getOrder.fulfilled.match(result)) {
          orderData = result.payload;
        }
      }
      setOrder(orderData || null);
      setLoading(false);
    };

    getOrderDetails();
  }, [dispatch, orderNumber, orders, profileOrders]);

  const handleClose = () => {
    navigate(background || "/", { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  if (!background) {
    return <OrderDetails order={order} />;
  }

  return (
    <Modal title="" isOpen={true} onClose={handleClose}>
      <OrderDetails order={order} />
    </Modal>
  );
};
