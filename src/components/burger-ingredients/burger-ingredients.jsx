import React, { useState, useMemo, useRef, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { burgerIngredientsTypes } from "../../utils/types";
import IngredientDetails from "../ingredient-details/ingredient-details";

const groupIngredients = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
};

function BurgerIngredients({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const openModal = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [current, setCurrent] = useState("one");
  const ingredientRefs = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const groupedIngredients = useMemo(() => groupIngredients(data), [data]);

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
      {isModalOpen && currentIngredient && (
        <Modal
          isOpen={isModalOpen}
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
