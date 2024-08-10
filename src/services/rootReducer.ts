import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredientsSlice';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import currentIngredientReducer from './currentIngredient/currentIngredientSlice';
import orderReducer from './order/orderSlice';
import modalReducer from './modal/modalSlice';
import authReducer from './auth/authSlice';
import orderFeedSlice from './middleware/orderFeed/order-feed-slice'
import profileFeedSlice from './middleware/profileFeed/profile-feed-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  modal: modalReducer,
  auth: authReducer,
  [orderFeedSlice.reducerPath]: orderFeedSlice.reducer,
  [profileFeedSlice.reducerPath]: profileFeedSlice.reducer
});