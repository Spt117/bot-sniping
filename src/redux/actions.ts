import { Network } from "@/library/interfaces";

export const myAccount = (account: string) => ({
    type: "account",
    value: account,
});

export const myIsConnect = (isConnect: boolean) => ({
    type: "isConnect",
    value: isConnect,
});

export const myChain = (chain: Network) => ({
    type: "chain",
    value: chain,
});

export const myBalance = (balance: number) => ({
    type: "balance",
    value: balance,
});

export const myComposantSniper = (composant: any) => ({
    type: "composantSniper",
    value: composant,
});
