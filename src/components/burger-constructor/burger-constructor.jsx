import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
} from "../../services/burgerConstructor/burgerConstructorSlice";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyles from "./burger-constructor.module.css";
import ingridienticon from "../../images/list-icon.png";
import Modal from "../modal/modal";
import OrderDetails from "../order/order";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { constructorTypes } from "../../utils/types";
import { createOrder } from "../../services/order/orderSlice";
import { openModal, closeModal } from "../../services/modal/modalSlice";

const Placeholder = ({ text, type }) => (
  <div className={`${ConstructorStyles.ingredientRow} ${type === 'bun' ? ConstructorStyles.bunPlaceholder : ConstructorStyles.ingredientPlaceholder}`}>
    <p className={ConstructorStyles.placeholderText}>{text}</p>
  </div>
);

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order, orderRequest, isOrderModalOpen } = useSelector(
    (state) => state.order
  );

  const ingredientIds = ingredients.map((ingredient) => ingredient._id);
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

  const handleAddIngredient = useCallback(
    (ingredient) => {
      dispatch(addIngredient(ingredient));
    },
    [dispatch]
  );

  const handleRemoveIngredient = useCallback(
    (ingredientId) => {
      dispatch(removeIngredient(ingredientId));
    },
    [dispatch]
  );

  const handleMoveIngredient = useCallback(() => {
    dispatch(moveIngredient());
  }, [dispatch]);

  const total = ingredients.reduce(
    (acc, item) => acc + item.price,
    bun ? bun.price * 2 : 0
  );

  return (
    <div className={ConstructorStyles.container + " mt-25 ml-16"}>
      <div className={ConstructorStyles.bunTop}>
        {bun ? (
          <BurgerConstructorElement
            ingredient={{ ...bun, type: "top" }}
            isLocked={true}
          />
        ) : (
          <Placeholder text="Перетащите булку сверху" type="bun"/>
        )}
      </div>

      <div className={`${ConstructorStyles.scrollable} container`}>
        {ingredients.length ? (
          ingredients.map((ingredient, index) => (
            <div className={ConstructorStyles.ingredientRow} key={ingredient._id}>
            <BurgerConstructorElement
              ingredient={ingredient}
            />
            </div>
          ))
        ) : (
          <Placeholder text="Перетащите начинку" type="ingredient"/>
        )}
      </div>

      <div className={ConstructorStyles.bunBottom}>
        {bun ? (
          <BurgerConstructorElement
            ingredient={{ ...bun, type: "bottom" }}
            isLocked={true}
          />
        ) : (
          <Placeholder text="Перетащите булку снизу" type="bun"/>
        )}
      </div>

      <div className={ConstructorStyles.total}>
        <p className={ConstructorStyles.price}>
          <span className={ConstructorStyles.priceSpan}>Итого:</span>
          <CurrencyIcon type="primary" />
          <span className={ConstructorStyles.totalSpan}>{total}</span>
        </p>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          onClick={handleCreateOrder}
          disabled={orderRequest}
        >
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
