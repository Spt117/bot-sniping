import { Network, ParamsSniper } from "@/library/interfaces";

export const myAccount = (account: string) => ({
    type: "account",
    value: account,
});

export const myIsConnect = (isConnect: boolean) => ({
    type: "isConnect",
    value: isConnect,
});

export const myOverlay = (overlay: boolean) => ({
    type: "overlay",
    value: overlay,
});

export const myChain = (chain: Network) => ({
    type: "chain",
    value: chain,
});

export const myBalance = (balance: number) => ({
    type: "balance",
    value: balance,
});

export const myAddASniper = (addASniper: boolean) => ({
    type: "addASniper",
    value: addASniper,
});

export const myComposantSniper = (composant: ParamsSniper) => ({
    type: "composantSniper",
    value: composant,
});

export const myDisableSniper = (disableSniper: ParamsSniper) => ({
    type: "disableSniper",
    value: disableSniper,
});
