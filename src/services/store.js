import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "./rootReducer"
import authReducer from '../services/authSlice';


const store = configureStore({
  reducer: rootReducer,
  auth: authReducer,

});

export default store;