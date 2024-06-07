import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { moveIngredient } from '../../services/burgerConstructor/burgerConstructorSlice';

const BurgerConstructorElement = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const type = ingredient.type === 'bun' ? 'bun' : 'ingredient';

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { id: ingredient._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    drop(item) {
      if (item.index !== index) {
        dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref}>
      <ConstructorElement
        type={ingredient.type === 'bun' ? ingredient.type : undefined}
        isLocked={ingredient.type === 'bun'}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

export default BurgerConstructorElement;