import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { refreshAccessToken } from "../../../utils/api";

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
  wsActions: TWsActionTypes,
  withTokenRefresh: boolean = false
): Middleware<{}, RootState> => {
  return ({ dispatch }: { dispatch: AppDispatch }) => {
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

    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError("Error"));
        };

        socket.onmessage = async (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              parsedData.message === "Invalid or missing token"
            ) {
              try {
                const newAccessToken = await refreshAccessToken();
                const newToken = newAccessToken.replace("Bearer ", "");
                const wssUrl = new URL(action.payload);
                wssUrl.searchParams.set("token", newToken);

                dispatch(connect(wssUrl.toString()));
              } catch (err) {
                dispatch(onError((err as { message: string }).message));
                dispatch(disconnect());
              }

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as { message: string }).message));
          }
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, 3000);
          }
        };
        next(action);
      } else if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as { message: string }).message));
        }
      } else if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
        next(action);
      } else {
        next(action);
      }
    };
  };
};
