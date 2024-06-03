import React, { useState, useEffect, useCallback } from "react";
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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  console.log('ingredients', ingredients);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        {nonBunIngredients.map((ingredient) => (
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
        <Button type="primary" htmlType='submit' size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

BurgerConstructor.propTypes = constructorTypes;

export default BurgerConstructor;
