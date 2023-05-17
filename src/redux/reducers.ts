import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "./initState";

export const accountReducer = (
    state = initialState.account,
    action: AnyAction
) => {
    switch (action.type) {
        case "account":
            return action.value;
        default:
            return state;
    }
};

export const isConnectReducer = (
    state = initialState.isConnect,
    action: AnyAction
) => {
    switch (action.type) {
        case "isConnect":
            return action.value;
        default:
            return state;
    }
};

export const chainReducer = (state = initialState.chain, action: AnyAction) => {
    switch (action.type) {
        case "chain":
            return action.value;
        default:
            return state;
    }
};

export const balanceReducer = (
    state = initialState.balance,
    action: AnyAction
) => {
    switch (action.type) {
        case "balance":
            return action.value;
        default:
            return state;
    }
};