import { useDrag } from "react-dnd";

function DraggableIngredient({ ingredient }) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: 'ingredient',
      item: { ...ingredient },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <div
        ref={drag} 
        className={burgerIngredientsStyles.ingredient}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={burgerIngredientsStyles.ingredientImage}
        />
        <p className={burgerIngredientsStyles.ingredientPrice}>
          {ingredient.price} ₽
        </p>
        <p className={burgerIngredientsStyles.ingredientName}>
          {ingredient.name}
        </p>
      </div>
    );
  }

  export default DraggableIngredient;