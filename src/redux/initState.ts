import { AppState } from "@/library/interfaces";

export const initialState: AppState = {
    isConnect: false,
    overlay: false,
    account: "",
    chain: { name: "Non-connecté", id: null },
    balance: 0,
    addASniper: false,
    composantSniper: [],
};
