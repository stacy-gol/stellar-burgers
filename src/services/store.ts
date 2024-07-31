import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "./rootReducer"
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { socketMiddleware } from './middleware/middleware/socketMiddleware';
import { wsConnect as orderFeedConnect, wsDisconnect as orderFeedDisconnect } from './middleware/orderFeed/actions';
import { wsClose as orderFeedClose, wsConnecting as orderFeedConnecting, wsError as orderFeedError, wsMessage as orderFeedMessage, wsOpen as orderFeedOpen } from './middleware/orderFeed/slice';
// import { wsConnect , wsDisconnect } from './middleware/orderFeed/actions';
// import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './middleware/orderFeed/slice';
// import { wsConnect as profileFeedConnect, wsDisconnect as profileFeedDisconnect } from './middleware/profileFeed/actions';
// import { wsClose as profileFeedClose, wsConnecting as profileFeedConnecting, wsError as profileFeedError, wsMessage as profileFeedMessage, wsOpen as profileFeedOpen } from './middleware/profileFeed/slice';

const orderFeedMiddleware = socketMiddleware({
  connect: orderFeedConnect,
    disconnect: orderFeedDisconnect,
    onConnecting: orderFeedConnecting,
    onOpen: orderFeedOpen,
    onClose: orderFeedClose,
    onError: orderFeedError,
    onMessage: orderFeedMessage,
});

// const profileFeedMiddleware = socketMiddleware({
//   connect: profileFeedConnect,
//   disconnect: profileFeedDisconnect,
//   onConnecting: profileFeedConnecting,
//   onOpen: profileFeedOpen,
//   onClose: profileFeedClose,
//   onError: profileFeedError,
//   onMessage: profileFeedMessage,
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware/*, profileFeedMiddleware*/)
  }
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
