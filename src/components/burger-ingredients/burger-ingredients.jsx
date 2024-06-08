import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/ingredients/ingredientsSlice";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import Modal from "../modal/modal";
import { burgerIngredientsTypes } from "../../utils/types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { openModal, closeModal } from "../../services/modal/modalSlice";
import {
  setIngredient,
  clearIngredient,
} from "../../services/currentIngredient/currentIngredientSlice";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { allIngredients, loading, error } = useSelector(
    (state) => state.ingredients
  );
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const currentIngredient = useSelector(
    (state) => state.currentIngredient.currentIngredient
  );
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const openIngredientModal = (ingredient) => {
    dispatch(setIngredient(ingredient));
    dispatch(openModal());
  };

  const closeIngredientModal = () => {
    dispatch(clearIngredient());
    dispatch(closeModal());
  };

  const [current, setCurrent] = useState("one");
  const ingredientRefs = {
    bun: useRef(null),
    sauce: useRef(null),
    main: useRef(null),
  };

  const ingredientCounts = useMemo(() => {
    const counts = {};
    if (bun) {
      counts[bun._id] = 2;
    }
    ingredients.forEach((ingredient) => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });
    return counts;
  }, [bun, ingredients]);

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
              >
                <DraggableIngredient
                  ingredient={ingredient}
                  onClick={() => openIngredientModal(ingredient)}
                  orderCount={ingredientCounts[ingredient._id]}
                />
              </div>
            ))}
          </div>
        </div>
      );
    },
    [loading, error, ingredientRefs]
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
          isOpen={isModalOpen}
          onClose={closeIngredientModal}
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
