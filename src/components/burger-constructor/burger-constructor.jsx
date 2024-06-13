import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/burgerConstructor/burgerConstructorSlice";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order/order";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { createOrder } from "../../services/order/orderSlice";
import { openOrderModal, closeOrderModal } from "../../services/modal/modalSlice";

const Placeholder = ({ text, type, position }) => (
  <div
    className={`${ConstructorStyles.ingredientRow}
      ${type === "ingredient" ? ConstructorStyles.placeholder : ""} 
      ${position === "top" ? ConstructorStyles.bunTopPlaceholder : ""} 
      ${position === "bottom" ? ConstructorStyles.bunBottomPlaceholder : ""}`}
  >
    <p className={ConstructorStyles.placeholderText}>{text}</p>
  </div>
);

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order, orderRequest } = useSelector(
    (state) => state.order
  );
  const isModalOpen = useSelector((state) => state.modal.orderModal.isOpen);


  const bunTop = bun && (
    <div>
      <ConstructorElement
        type="top"
        isLocked
        text={bun.name + " (верх)"}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );

  const bunBottom = bun && (
    <div>
      <ConstructorElement
        type="bottom"
        isLocked
        text={bun.name + " (низ)"}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );

  const [{}, dropBunTopTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient({ ...item, position: "top" }));
    },
  });

  const [{}, dropBunBottomTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient({ ...item, position: "bottom" }));
    },
  });

  const [, dropIngredientTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type !== "bun" && !item.isExistingIngredient) {
        dispatch(addIngredient(item));
      }
    },
  });

  const ingredientIds = ingredients.map((ingredient) => ingredient._id);
  if (bun) {
    ingredientIds.unshift(bun._id);
    ingredientIds.push(bun._id);
  }

  const handleCreateOrder = () => {
    dispatch(createOrder(ingredientIds));
    dispatch(openOrderModal());
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
  };

  const total = ingredients.reduce(
    (acc, item) => acc + item.price,
    bun ? bun.price * 2 : 0
  );

  return (
    <div className={ConstructorStyles.container + " mt-25 ml-16"}>
      <div className={ConstructorStyles.bunTop} ref={dropBunTopTarget}>
        {bun ? (
          bunTop
        ) : (
          <Placeholder text="Перетащите булку сверху" position="top" />
        )}
      </div>

      <div
        className={`${ConstructorStyles.scrollable} container`}
        ref={dropIngredientTarget}
      >
        {ingredients.length ? (
          ingredients.map((ingredient, index) => (
            <div
              className={ConstructorStyles.ingredientRow}
              key={ingredient.uniqueKey}
            >
              <DragIcon/>
              <BurgerConstructorElement ingredient={ingredient} index={index} />
            </div>
          ))
        ) : (
          <Placeholder text="Перетащите начинку" type="ingredient" />
        )}
      </div>

      <div className={ConstructorStyles.bunBottom} ref={dropBunBottomTarget}>
        {bun ? (
          bunBottom
        ) : (
          <Placeholder text="Перетащите булку снизу" position="bottom" />
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
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
