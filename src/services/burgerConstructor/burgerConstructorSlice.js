import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const { type, uniqueKey } = action.payload;
        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push({ ...action.payload, uniqueKey });
        }
      },
      prepare: (ingredient) => {
        return { payload: { ...ingredient, uniqueKey: uuidv4() } };
      }
    },
    removeIngredient: (state, action) => {
      const { uniqueKey } = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uniqueKey !== uniqueKey
      );
    },
    moveIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      state.ingredients = ingredients;
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;