import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/ingredients/ingredientsSlice';
import burgerConstructorReducer from '../services/burgerConstructor/burgerConstructorSlice';
import currentIngredientReducer from '../services/currentIngredient/currentIngredientSlice';
import orderReducer from '../services/order/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});