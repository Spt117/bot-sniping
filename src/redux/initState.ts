import { AppState } from "@/library/interfaces";

export const initialState: AppState = {
    isConnect: false,
    overlay: false,
    account: "",
    network: { name: "", symbol: "", connection: "", chainId: 0 },
    balance: 0,
    addASniper: false,
    composantSniper: [],
};
