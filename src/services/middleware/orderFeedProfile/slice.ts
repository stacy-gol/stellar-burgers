import { OrderFeed, OrderFeedAction, WebsocketStatus} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ProfileFeedStore = {
    status: WebsocketStatus;
    profileFeed: OrderFeed;
    connectionError: string | null;
};

const initialState: ProfileFeedStore = {
    status: WebsocketStatus.OFFLINE,
    profileFeed: [],
    connectionError: null,
};

export const profileFeedSlice = createSlice({
    name: "feedProfile",
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
            state.profileFeed = action.payload
        }
    },
    selectors: {
        getProfileFeed: state => state.profileFeed,
    }
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = profileFeedSlice.actions;
export const { getProfileFeed } = profileFeedSlice.selectors;

export type TWsInternalActions = ReturnType<typeof profileFeedSlice.actions[keyof typeof profileFeedSlice.actions]>;
export default profileFeedSlice
