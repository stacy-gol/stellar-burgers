import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BurgerIngredient, OrderDetail } from "../types";

interface ModalsState {
  orderModal: {
    isOpen: boolean;
  };
  ingredientModal: {
    isOpen: boolean;
    currentIngredient: BurgerIngredient | null;
  };
  orderFeedModal: {
    currentOrder: OrderDetail | null;
    isOpen: boolean;
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
  orderFeedModal: {
    currentOrder: null,
    isOpen: false,
  },
};

const modalsSlice = createSlice({
  name: "modals",
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
    openOrderFeedModal(state, action: PayloadAction<OrderDetail | null>) {
      state.orderFeedModal.currentOrder = action.payload;
      state.orderFeedModal.isOpen = true;
    },
    closeOrderFeedModal(state) {
      state.orderFeedModal.currentOrder = null;
      state.orderFeedModal.isOpen = false;
    },
  },
});

export const {
  openOrderModal,
  closeOrderModal,
  openIngredientModal,
  closeIngredientModal,
  openOrderFeedModal,
  closeOrderFeedModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
