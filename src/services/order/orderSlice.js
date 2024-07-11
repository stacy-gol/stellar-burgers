import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { getCookie } from "../../utils/cookies";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredientIds, { rejectWithValue }) => {
    const accessToken = getCookie("accessToken");
      const response = await request("/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      return response.order;
  }
);

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: null,
};

export const orderSlice = createSlice({
  name: "order",
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
        state.orderFailed = action.error.message; 
        state.orderRequest = false;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
