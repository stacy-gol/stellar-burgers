import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients/ingredientsSlice';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { burgerIngredientsTypes } from "../../utils/types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setIngredient, clearIngredient } from "../../services/currentIngredient/currentIngredientSlice";


function BurgerIngredients() {
  const dispatch = useDispatch();
  const { allIngredients, loading, error } = useSelector((state) => state.ingredients);
  const currentIngredient = useSelector((state) => state.burgerConstructor.currentIngredient);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  
  const openModal = (ingredient) => {
    dispatch(setIngredient(ingredient)); 
  };
  const closeModal = () => {
    dispatch(clearIngredient());
  };

  const [current, setCurrent] = useState("one");
  const ingredientRefs = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const groupedIngredients = useMemo(() => {
    if (!loading && allIngredients.length > 0) {
      return allIngredients.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
      }, {});
    }
    return {};
  }, [loading, allIngredients]);

  const handleTabClick = useCallback(
    (value, type) => {
      setCurrent(value);
      ingredientRefs[type].current.scrollIntoView({ behavior: "smooth" });
    },
    [ingredientRefs]
  );

  const renderIngredientsByType = useCallback(
    (ingredients, type) => {
      const ingredientTypeNames = {
        bun: "Булки",
        main: "Начинки",
        sauce: "Соусы",
      };

      const typeName = ingredientTypeNames[type] || type;

      if (loading) {
        return <p>Загрузка...</p>;
      }
    
      if (error) {
        return <p>Ошибка: {error}</p>;
      }

      return (
        <div key={type} ref={ingredientRefs[type]}>
          <h3 className={burgerIngredientsStyles.typeTitle}>{typeName}</h3>
          <div className={burgerIngredientsStyles.typeContainer}>
            {ingredients.map((ingredient) => (
              <div
                key={ingredient._id}
                className={burgerIngredientsStyles.ingredient}
                onClick={() => openModal(ingredient)}
              >
                <img
                  src={ingredient.image}
                  alt="Картинка ингредиента"
                  className={burgerIngredientsStyles.ingredientImage}
                />
                <p className={burgerIngredientsStyles.ingredientPrice}>
                  {ingredient.price} ₽
                </p>
                <p className={burgerIngredientsStyles.ingredientName}>
                  {ingredient.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    },
    [ingredientRefs]
  );

  return (
    <div className={burgerIngredientsStyles.burgerContainer}>
      <h1>Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabsContainer}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => handleTabClick("one", "bun")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => handleTabClick("two", "sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => handleTabClick("three", "main")}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredientsContainer} container`}
      >
        {Object.keys(groupedIngredients).map((type) =>
          renderIngredientsByType(groupedIngredients[type], type)
        )}
      </div>
      {currentIngredient && (
        <Modal
          isOpen={!!currentIngredient}
          onClose={closeModal}
          title="Детали ингредиента"
        >
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredients.propTypes = burgerIngredientsTypes;

export default BurgerIngredients;
