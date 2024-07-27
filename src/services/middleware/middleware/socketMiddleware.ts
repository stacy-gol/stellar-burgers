import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TWsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  sendMessage?: ActionCreatorWithPayload<any>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
  return ({ dispatch }) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      sendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
      onConnecting,
      disconnect,
    } = wsActions;
    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        onConnecting && dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
          }
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (socket && sendMessage?.match(action)) {
          try {
            socket.send(JSON.stringify(action.payload));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
          }
        }

        if (socket && disconnect.match(action)) {
          socket.close();
          socket = null;
        }

        next(action);
      }
    };
  };
};
