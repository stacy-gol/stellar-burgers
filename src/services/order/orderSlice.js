import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ENDPOINT from "../../utils/api"

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENDPOINT}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingredientIds })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        return rejectWithValue(data);
      }

      return data.order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.orderFailed = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
        state.orderFailed = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderFailed = action.payload;
        state.orderRequest = false;
      });
  },
});

export const {
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;