import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { openIngredientModal, closeIngredientModal } from "../../services/modal/modalSlice";
import {
  setIngredient,
  clearIngredient,
} from "../../services/currentIngredient/currentIngredientSlice";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const { allIngredients, loading, error } = useSelector(
    (state) => state.ingredients
  );
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const currentIngredient = useSelector(
    (state) => state.currentIngredient.currentIngredient
  );
  
  const handleOpenIngredientModal = useCallback((ingredient) => {
    dispatch(setIngredient(ingredient));
    dispatch(openIngredientModal());
    navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location.pathname } });
  }, [dispatch, navigate, location]);


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

  const handleTabClick = useCallback(
    (value, type) => {
      setCurrent(value);
      ingredientRefs[type].current.scrollIntoView({ behavior: "smooth" });
    },
    [ingredientRefs]
  );

  const getClosestHeading = () => {
    const headings = {
      bun: ingredientRefs.bun.current,
      sauce: ingredientRefs.sauce.current,
      main: ingredientRefs.main.current,
    };
    let closest = "bun";
    let minDistance = Infinity;

    Object.keys(headings).forEach((key) => {
      const heading = headings[key];
      if (heading) {
        const distance = heading.getBoundingClientRect().top;
        if (distance >= 0 && distance < minDistance) {
          closest = key;
          minDistance = distance;
        }
      }
    });

    return closest;
  };

  useEffect(() => {
    const onScroll = () => {
      const closest = getClosestHeading();
      setCurrent(closest);
    };

    const containerElement = document.querySelector(
      `.${burgerIngredientsStyles.ingredientsContainer}`
    );
    containerElement.addEventListener("scroll", onScroll);

    return () => {
      containerElement.removeEventListener("scroll", onScroll);
    };
  }, []);

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
                  onClick={() => handleOpenIngredientModal(ingredient)}
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
          value="bun"
          active={current === "bun"}
          onClick={() => handleTabClick("bun", "bun")}
        >
          Булки
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main", "main")}
        >
          Начинки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce", "sauce")}
        >
          Соусы
        </Tab>
      </div>
      <div
        className={`${burgerIngredientsStyles.ingredientsContainer} container`}
      >
        {Object.keys(groupedIngredients).map((type) =>
          renderIngredientsByType(groupedIngredients[type], type)
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;
