import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderModal: {
    isOpen: false,
  },
  ingredientModal: {
    isOpen: false,
    currentIngredient: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openOrderModal(state) {
      state.orderModal.isOpen = true;
    },
    closeOrderModal(state) {
      state.orderModal.isOpen = false;
    },
    openIngredientModal(state, action) {
      state.ingredientModal.isOpen = true;
      state.ingredientModal.currentIngredient = action.payload;
    },
    closeIngredientModal(state) {
      state.ingredientModal.isOpen = false;
      state.ingredientModal.currentIngredient = null;
    },
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openIngredientModal,
  closeIngredientModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;