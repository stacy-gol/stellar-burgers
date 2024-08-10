import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../utils/api";
import { BurgerIngredient } from "../types";

export interface IngredientsState {
  allIngredients: BurgerIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  allIngredients: [],
  loading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk<BurgerIngredient[]>(
  "ingredients/fetchIngredients",
  async () => {
    return await request("/api/ingredients", {});
  }
);

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
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<BurgerIngredient[]>) => {
        state.allIngredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectAllIngredients = (state: { ingredients: IngredientsState }) => state.ingredients.allIngredients;

export const { resetIngredientsState } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
