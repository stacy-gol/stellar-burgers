import React, { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeIngredient,
  moveIngredient,
} from "../../services/burgerConstructor/burgerConstructorSlice";
import { Ingredient } from "../../services/types";
import { useDispatch } from "../../services/store";

interface BurgerConstructorElementProps {
  ingredient: Ingredient;
  index: number;
}

const BurgerConstructorElement = ({ ingredient, index }: BurgerConstructorElementProps): React.JSX.Element => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<{ index: number }>({
    accept: "ingredient",
    hover(item: { index: number }, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (
        typeof dragIndex === "undefined" ||
        typeof hoverIndex === "undefined"
      ) {
        return;
      }

      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: { id: ingredient.uniqueKey, index, isExistingIngredient: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDeleteClick = () => {
    dispatch(removeIngredient({ uniqueKey: ingredient.uniqueKey }));
  };

  const style = { opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={ref} style={style}>
      <ConstructorElement
        type={ingredient.type === "bun" ? "top" : undefined} 
        isLocked={ingredient.type === "bun"}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDeleteClick}
      />
    </div>
  );
};

export default BurgerConstructorElement;
