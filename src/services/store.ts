import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "./rootReducer"
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,

});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
