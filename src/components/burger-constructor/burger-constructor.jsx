import React, { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../../services/burgerConstructor/burgerConstructorSlice';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorSyles from "./burger-constructor.module.css";
import ingridienticon from "../../images/list-icon.png";
import Modal from "../modal/modal";
import OrderDetails from "../order/order";
import { constructorTypes } from "../../utils/types";
import { createOrder } from '../../services/order/orderSlice';
import { openModal, closeModal } from '../../services/modal/modalSlice';


function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order, orderRequest, isOrderModalOpen } = useSelector((state) => state.order);

  const ingredientIds = ingredients.map(ingredient => ingredient._id); 
  if (bun) {
    ingredientIds.unshift(bun._id);
    ingredientIds.push(bun._id);
  }

  const handleCreateOrder = () => {
    dispatch(createOrder(ingredientIds));
    dispatch(openModal());
  };
  
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddIngredient = useCallback((ingredient) => {
    dispatch(addIngredient(ingredient));
  }, [dispatch]);

  const handleRemoveIngredient = useCallback((ingredientId) => {
    dispatch(removeIngredient(ingredientId));
  }, [dispatch]);

  const handleMoveIngredient = useCallback(() => {
    dispatch(moveIngredient());
  }, [dispatch]);

  const total = ingredients.reduce(
    (acc, item) => acc + item.price,
    bun ? bun.price * 2 : 0 
  );

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
        {ingredients.map((ingredient) => (
          <div className={ConstructorSyles.ingredientRow} key={ingredient._id}>
            <img
              src={ingridienticon}
              className={ConstructorSyles.ingredientIcon}
              alt="Фото ингредиента"
            />
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
        <Button type="primary" htmlType='submit' size="large" onClick={handleCreateOrder} disabled={orderRequest}>
          Оформить заказ
        </Button>
      </div>
      {order && (
        <Modal isOpen={isOrderModalOpen} onClose={handleCloseModal}>
      <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = constructorTypes;

export default BurgerConstructor;
