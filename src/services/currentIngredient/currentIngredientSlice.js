import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIngredient: null,
};

export const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { setIngredient, clearIngredient } =
  currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
