import { scanMempool } from "./mempool";
import { IDataAccount } from "@/library/interfaces";

export async function buyWithMempool(
    dataAccounts: IDataAccount[],
    tokenAdress: string,
    functionBuy: Function,
    onBuyComplete: Function
) {
    await scanMempool(dataAccounts, tokenAdress, functionBuy, onBuyComplete);
}
// result:
