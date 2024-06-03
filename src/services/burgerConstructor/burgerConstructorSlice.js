import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const initialState = {
  bun: null,
  otherIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === "bun") {
        state.bun = ingredient;
      } else {
        state.otherIngredients.push(ingredient);
      }
    },
    removeIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = null;
      } else {
        state.otherIngredients = state.otherIngredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
      }
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedIngredient = state.otherIngredients[dragIndex];
      state.otherIngredients.splice(dragIndex, 1);
      state.otherIngredients.splice(hoverIndex, 0, draggedIngredient);
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
