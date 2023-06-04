import { ethers } from "ethers";
import { GetTransaction } from "../library/class";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";

// @ts-ignore
const provider = new ethers.WebSocketProvider(process.env.alchemyGoerliWebSocket);

let pendingHandler: ethers.Listener | undefined;

export async function scanMempool(
    transactions: GetTransaction[],
    tokenAdress: string,
    functionBuy: Function,
    onBuyComplete: Function
) {
    console.log("Started monitoring the mempool.");
    const iface = new ethers.Interface(AbiUniswapV2Router);
    pendingHandler = async (tx: string) => {
        try {
            const txInfo = await provider.getTransaction(tx);
            if (txInfo && txInfo.to === transactions[0].blockchainRouter.router.address) {
                console.log("UniswapV2 detected a new transaction in the mempool: " + JSON.stringify(txInfo, null, 2));
                const data = txInfo.data;
                const decodedTransaction = iface.parseTransaction({ data });
                const args = decodedTransaction?.args;
                let found = false;
                for (let key in args) {
                    if (args[key] === tokenAdress) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    console.log("Token found");
                    stopMempool();
                    await functionBuy(transactions, tokenAdress);
                    onBuyComplete();
                } else console.log("Token not found");
            } else console.log("Transaction not found");
        } catch (error) {
            console.log(error);
        }
    };

    provider.on("pending", pendingHandler);
}

export function stopMempool() {
    if (pendingHandler) {
        provider.off("pending", pendingHandler);
        console.log("Stopped monitoring the mempool.");
    }
}
