import { GetTransaction } from "@/library/class";
import { scanMempool } from "./mempool";

export async function buyWithMempool(
    transactions: GetTransaction[],
    tokenAdress: string,
    functionBuy: Function,
    onBuyComplete: Function
) {
    await scanMempool(transactions, tokenAdress, functionBuy, onBuyComplete);
}
