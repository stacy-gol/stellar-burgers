import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: null, 
  orderRequest: false, 
  orderFailed: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.orderRequest = true;
      state.orderFailed = null;
    },
    createOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.orderRequest = false;
    },
    createOrderFailed: (state, action) => {
      state.orderFailed = action.payload;
      state.orderRequest = false;
    },
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.orderFailed = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;