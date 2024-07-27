import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ORDER_FEED_PROFILE_CONNECT">(
    "ORDER_FEED_PROFILE_CONNECT"
);

export const wsDisconnect = createAction("ORDER_FEED_PROFILE_CONNECT");

export type TWsExternalActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;