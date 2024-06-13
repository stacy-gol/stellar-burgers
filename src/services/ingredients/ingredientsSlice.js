import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_,) => {
    const response = await request("/api/ingredients");
    return response.data;
  }
);

const initialState = {
  allIngredients: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    resetIngredientsState: (state) => {
      state.allIngredients = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export const { resetIngredientsState } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
