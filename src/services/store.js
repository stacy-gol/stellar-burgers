import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import { customEnhancer } from './enhancers';
import {rootReducer} from "./rootReducer"

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [customEnhancer],
});

export default store;