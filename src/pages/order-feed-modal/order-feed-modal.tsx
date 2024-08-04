import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';

export const OrderFeedModal = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const background = location.state && location.state.backgroundLocation;

  const handleClose = () => {
    navigate(background || '/', { replace: true });
  };

  console.log("OrderFeedModal rendered"); 


  if (!background) {
    return <OrderDetails />;
  }

  return (
    <Modal title="Детали заказа" isOpen={true} onClose={handleClose}>
      <OrderDetails />
    </Modal>
  );
};