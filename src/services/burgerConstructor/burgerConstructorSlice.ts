import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "../types";

interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        const { type } = action.payload;
        if (type === "bun") {
          return {
            ...state,
            bun: action.payload,
          };
        } else
          return {
            ...state,
            ingredients: [...state.ingredients, action.payload],
          };
      },
      prepare: (ingredient) => {
        const uniqueKey = uuidv4();
        return { payload: { ...ingredient, uniqueKey } };
      },
    },
    removeIngredient: (state, action: PayloadAction<{ uniqueKey: string }>) => {
      const { uniqueKey } = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uniqueKey !== uniqueKey
      );
    },
    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex !== toIndex) {
        const movedIngredient = state.ingredients[fromIndex];
        state.ingredients.splice(fromIndex, 1);
        state.ingredients.splice(toIndex, 0, movedIngredient);
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
