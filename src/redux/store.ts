import { configureStore } from "@reduxjs/toolkit";
import {
    accountReducer,
    balanceReducer,
    composantSniperReducer,
    isAddASniperReducer,
    isConnectReducer,
    overlayReducer,
    networkReducer,
} from "./reducers";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        isConnect: isConnectReducer,
        overlay: overlayReducer,
        network: networkReducer,
        balance: balanceReducer,
        addASniper: isAddASniperReducer,
        composantSniper: composantSniperReducer,
    },
});

// store.subscribe(() => {
//     console.log("store :", store.getState());
// });
