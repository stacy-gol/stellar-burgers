import { OrderFeed, OrderFeedAction, WebsocketStatus} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OrderFeedStore = {
    status: WebsocketStatus;
    orders: OrderFeed;
    connectionError: string | null;
};

const initialState: OrderFeedStore = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null,
};

export const orderFeedSlice = createSlice({
    name: "orderFeed",
    initialState,
    reducers: {
        wsConnecting:(state) => {
            state.status = WebsocketStatus.CONNECTING;
          },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
          },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
          },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
          },
          wsMessage: (state, action: PayloadAction<OrderFeedAction>) => {
            state.orders = action.payload.orders;
        },
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = orderFeedSlice.actions;

export type TWsInternalActions = ReturnType<typeof orderFeedSlice.actions[keyof typeof orderFeedSlice.actions]>;
export default orderFeedSlice
