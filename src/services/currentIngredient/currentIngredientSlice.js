import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const {
  setCurrentIngredient,
  clearCurrentIngredient,
} = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;