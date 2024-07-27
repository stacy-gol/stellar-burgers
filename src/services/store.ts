import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "./rootReducer"
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { socketMiddleware } from './middleware/middleware/socketMiddleware';
import { wsConnect, wsDisconnect } from './middleware/orderFeed/actions';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './middleware/orderFeed/slice';

const orderFeed = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
})

const profileFeed = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeed, profileFeed)
  }
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
