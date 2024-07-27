import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../types';

interface ModalsState {
  orderModal: {
    isOpen: boolean;
  };
  ingredientModal: {
    isOpen: boolean;
    currentIngredient: BurgerIngredient | null;
  };
}

const initialState: ModalsState = {
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
    openIngredientModal(state, action: PayloadAction<BurgerIngredient | null>) {
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