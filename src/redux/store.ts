import { configureStore } from "@reduxjs/toolkit";
import {
    accountReducer,
    balanceReducer,
    chainReducer,
    isConnectReducer,
} from "./reducers";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        isConnect: isConnectReducer,
        chain: chainReducer,
        balance: balanceReducer,
    },
});

store.subscribe(() => {
    console.log("store :", store.getState());
});
