import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { addIngredient, clearConstructor } from "../../services/burgerConstructor/burgerConstructorSlice";
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
import Preloader from "../preloader/preloader";
import { createOrder } from "../../services/order/orderSlice";
import { openOrderModal, closeOrderModal } from "../../services/modal/modalSlice";
import { Ingredient } from "../../services/types";
import { useDispatch, useSelector } from "../../services/store";

const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
interface PlaceholderProps {
  text: string;
  type?: string;
  position?: string;
}

const Placeholder = ({ text, type, position }: PlaceholderProps): React.JSX.Element => (
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
  const navigate = useNavigate();
  const location = useLocation();
  const { bun, ingredients } = useSelector((state: any) => state.burgerConstructor);
  const { order, orderRequest } = useSelector(
    (state: any) => state.order
  );
  const isModalOpen = useSelector((state: any) => state.modal.orderModal.isOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);


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

  const [, dropBunTopTarget] = useDrop<Ingredient, void, unknown>({
    accept: "ingredient",
    drop(item: Ingredient) {
      dispatch(addIngredient({ ...item, position: "top" }));
    },
  });

  const [, dropBunBottomTarget] = useDrop<Ingredient, void, unknown>({
    accept: "ingredient",
    drop(item: Ingredient) {
      dispatch(addIngredient({ ...item, position: "bottom" }));
    },
  });

  const [, dropIngredientTarget] = useDrop<Ingredient, void, unknown>({
    accept: "ingredient",
    drop(item: Ingredient) {
      if (item.type !== "bun" && !item.isExistingIngredient) {
        dispatch(addIngredient(item));
      }
    },
  });

  const ingredientIds = ingredients.map((ingredient: Ingredient) => ingredient._id);
  if (bun) {
    ingredientIds.unshift(bun._id);
    ingredientIds.push(bun._id);
  }  

  const handleCreateOrder = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location } });
      return;
    }
    dispatch(createOrder(ingredientIds)).then(({ payload }: { payload: any }) => {
      if (payload) {
        dispatch(clearConstructor());
        dispatch(openOrderModal());
      }
    });
  };

  const handleCloseModal = () => {
    dispatch(closeOrderModal());
  };

  const total = ingredients.reduce(
    (acc: number, item: Ingredient) => acc + item.price,
    bun ? bun.price * 2 : 0
  );

  return (
    <div className={ConstructorStyles.container + " mt-25 ml-16"}>
      {orderRequest && <Preloader />}
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
          ingredients.map((ingredient: Ingredient, index: number) => (
            <div
              className={ConstructorStyles.ingredientRow}
              key={ingredient.uniqueKey}
            >
              <DragIcon type="primary"/>
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
          disabled={orderRequest || !bun}
        >
          Оформить заказ
        </Button>
      </div>
      {order && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Детали ингредиента">
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
