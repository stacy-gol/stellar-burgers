import { OrderFeed, OrderFeedAction, WebsocketStatus} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ProfileFeedStore = {
    status: WebsocketStatus;
    profileOrders: OrderFeed;
    connectionError: string | null;
};

const initialState: ProfileFeedStore = {
    status: WebsocketStatus.OFFLINE,
    profileOrders: [],
    connectionError: null,
};

export const profileFeedSlice = createSlice({
    name: "profileFeed",
    initialState,
    reducers: {
        wsConnecting:(state) => {
            state.status = WebsocketStatus.CONNECTING;
            console.log('WebsocketStatus.CONNECTING', state);
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
            console.log('action.payload', action.payload)
        },
        wsMessage: (state, action: PayloadAction<OrderFeedAction>) => {
            state.profileOrders = action.payload.orders
            console.log('action.payload', action.payload)
        }
    },
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = profileFeedSlice.actions;

export type TWsInternalActions = ReturnType<typeof profileFeedSlice.actions[keyof typeof profileFeedSlice.actions]>;
export default profileFeedSlice
