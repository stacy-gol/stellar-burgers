import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ORDER_FEED_CONNECT">(
    "ORDER_FEED_CONNECT"
);

export const wsDisconnect = createAction("ORDER_FEED_DISCONNECT");

export type TWsExternalActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;