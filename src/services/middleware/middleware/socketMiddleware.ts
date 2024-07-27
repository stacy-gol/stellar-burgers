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
};

export const socketMiddleware = (
  wsAction: TWsActionTypes
): Middleware<{}, RootState> => {
  return ({ dispatch }) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {};
  };
};
