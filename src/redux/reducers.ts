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

export const overlayReducer = (
    state = initialState.overlay,
    action: AnyAction
) => {
    switch (action.type) {
        case "overlay":
            return action.value;
        default:
            return state;
    }
};

export const networkReducer = (
    state = initialState.network,
    action: AnyAction
) => {
    switch (action.type) {
        case "network":
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

export const isAddASniperReducer = (
    state = initialState.addASniper,
    action: AnyAction
) => {
    switch (action.type) {
        case "addASniper":
            return action.value;
        default:
            return state;
    }
};

export const composantSniperReducer = (
    state = initialState.composantSniper,
    action: AnyAction
) => {
    switch (action.type) {
        case "composantSniper":
            return [...state, action.value];
        case "disableSniper": {
            const index = state.findIndex((obj) => {
                return obj.id === action.value.id;
            });
            if (index !== -1) {
                let newState = [...state];
                let newObj = { ...newState[index] };
                newObj.disable = true;
                newState[index] = newObj;
                return newState;
            }
        }
        default:
            return state;
    }
};
