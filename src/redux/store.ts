import { configureStore } from "@reduxjs/toolkit";
import {
    accountReducer,
    balanceReducer,
    chainReducer,
    composantSniperReducer,
    isAddASniperReducer,
    isConnectReducer,
} from "./reducers";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        isConnect: isConnectReducer,
        chain: chainReducer,
        balance: balanceReducer,
        addASniper: isAddASniperReducer,
        composantSniper: composantSniperReducer,
    },
});

// store.subscribe(() => {
//     console.log("store :", store.getState());
// });
