import { AppState } from "@/library/interfaces";

export const initialState: AppState = {
    isConnect: false,
    account: "",
    chain: { name: "Non-connecté", id: null },
    balance: 0,
    composantSniper: [0],
};
