import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  MutableRefObject,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import { openIngredientModal } from "../../services/modal/modalSlice";
import { setIngredient } from "../../services/currentIngredient/currentIngredientSlice";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import {
  BurgerIngredient,
  GroupedIngredients,
  IngredientCounts,
} from "../../services/types";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { allIngredients, loading, error } = useSelector(
    (state: any) => state.ingredients
  );
  const { bun, ingredients } = useSelector(
    (state: any) => state.burgerConstructor
  );
  const currentIngredient = useSelector(
    (state: any) => state.currentIngredient.currentIngredient
  );

  const handleOpenIngredientModal = useCallback(
    (ingredient: BurgerIngredient) => {
      dispatch(setIngredient(ingredient));
      //@ts-ignore
      dispatch(openIngredientModal());
      navigate(`/ingredients/${ingredient._id}`, {
        state: { backgroundLocation: location.pathname },
      });
    },
    [dispatch, navigate, location]
  );

  const [current, setCurrent] = useState("one");
  const ingredientRefs: {
    bun: MutableRefObject<HTMLDivElement | null>;
    sauce: MutableRefObject<HTMLDivElement | null>;
    main: MutableRefObject<HTMLDivElement | null>;
  } = {
    bun: useRef<HTMLDivElement | null>(null),
    sauce: useRef<HTMLDivElement | null>(null),
    main: useRef<HTMLDivElement | null>(null),
  };

  const groupedIngredients = useMemo(() => {
    if (
      !loading &&
      Array.isArray(allIngredients) &&
      allIngredients.length > 0
    ) {
      return allIngredients.reduce(
        (acc: GroupedIngredients, item: BurgerIngredient) => {
          if (!acc[item.type]) {
            acc[item.type] = [];
          }
          acc[item.type].push(item);
          return acc;
        },
        {}
      );
    }
    return {};
  }, [loading, allIngredients]);

  const ingredientCounts = useMemo(() => {
    const counts: IngredientCounts = {};
    if (bun) {
      counts[bun._id] = 2;
    }
    ingredients.forEach((ingredient: BurgerIngredient) => {
      counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
    });
    return counts;
  }, [bun, ingredients]);

  const handleTabClick = useCallback(
    (value: string, type: "bun" | "sauce" | "main") => {
      setCurrent(value);
      ingredientRefs[type].current?.scrollIntoView({ behavior: "smooth" });
    },
    [ingredientRefs]
  );

  const getClosestHeading = () => {
    const headings: Record<"bun" | "sauce" | "main", HTMLDivElement | null> = {
      bun: ingredientRefs.bun.current,
      sauce: ingredientRefs.sauce.current,
      main: ingredientRefs.main.current,
    };
    let closest = "bun";
    let minDistance = Infinity;

    Object.keys(headings).forEach((key) => {
      const typedKey = key as keyof typeof headings;
      const heading = headings[typedKey];
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

    const containerElement = document.querySelector<HTMLDivElement>(
      `.${burgerIngredientsStyles.ingredientsContainer}`
    );
    if (containerElement) {
      containerElement.addEventListener("scroll", onScroll);
    }
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  const ingredientTypeNames: Record<"bun" | "main" | "sauce", string> = {
    bun: "Булки",
    main: "Начинки",
    sauce: "Соусы",
  };

  const renderIngredientsByType = useCallback(
    (ingredients: BurgerIngredient[], type: "bun" | "sauce" | "main") => {
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
            {ingredients.map((ingredient: BurgerIngredient) => (
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
          renderIngredientsByType(
            groupedIngredients[type as "bun" | "sauce" | "main"],
            type as "bun" | "sauce" | "main"
          )
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;
