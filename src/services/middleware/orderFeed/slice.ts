import { OrderFeed, OrderFeedAction, WebsocketStatus} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type OrderFeedStore = {
    status: WebsocketStatus;
    orderFeed: OrderFeed;
    connectionError: string | null;
};

const initialState: OrderFeedStore = {
    status: WebsocketStatus.OFFLINE,
    orderFeed: [],
    connectionError: null,
};

export const orderFeedSlice = createSlice({
    name: "orderFeed",
    initialState,
    reducers: {
        wsConnecting: (): void => {
        },
        wsOpen: (state) => {
            state.connectionError = null;
        },
        wsClose: (): void=> {
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<OrderFeedAction>) => {
            state.orderFeed = action.payload
        }
    },
    selectors: {
        getOrderFeed: state => state.orderFeed,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = orderFeedSlice.actions;
export const { getOrderFeed } = orderFeedSlice.selectors;

export type TWsInternalActions = ReturnType<typeof orderFeedSlice.actions[keyof typeof orderFeedSlice.actions]>;
export default orderFeedSlice

// function orderFeedUpdate(orderFeed: OrderFeedAction, payload: unknown) {
//     throw new Error("Function not implemented.");
// }
