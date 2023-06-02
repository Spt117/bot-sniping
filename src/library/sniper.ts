import { ethers } from "ethers";
import { GetTransaction } from "./class";
import { IParamsSniper, ParamsTransaction } from "./interfaces";
import ABI from "../web3/abis/StoreSnipeAbi.json";
import { FeeAmount, computePoolAddress } from "@uniswap/v3-sdk";

export async function goSniper(
    sniper: IParamsSniper,
    ParamsTransaction: ParamsTransaction,
    address: string
) {
    const transactions = new GetTransaction(ParamsTransaction, sniper);
    const wallet = transactions.getWallet();
    const contract = new ethers.Contract(address, ABI, wallet);
    let nonce: number = 0;
    if (wallet) nonce = await wallet.getNonce();

    let txPromises = [];

    for (let i = 0; i < transactions.transaction.repeat; i++) {
        transactions.transaction.gas.nonce = nonce + i;
        const txPromise = (async () => {
            try {
                const tx = await contract.Snipe(
                    transactions.transaction.amount,
                    transactions.transaction.gas
                );
                console.log(tx);
                console.log("Transaction sent with nonce", nonce + i);
                const receipt = await tx.wait();

                console.log(
                    "Transaction was mined in block",
                    receipt.blockNumber
                );
            } catch (error) {
                console.error(
                    "An error occurred with transaction",
                    i,
                    ":",
                    error
                );
            }
        })();
        txPromises.push(txPromise);
    }

    try {
        await Promise.all(txPromises);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

export function multipleSniper(
    sniper: IParamsSniper,
    ParamsTransaction: ParamsTransaction[],
    address: string
) {
    for (let i = 0; i < ParamsTransaction.length; i++) {
        goSniper(sniper, ParamsTransaction[i], address);
    }
}

export async function getSnipers(
    ParamsTransaction: ParamsTransaction[],
    sniper: IParamsSniper
) {
    const transactions = new GetTransaction(ParamsTransaction[0], sniper);
    const wallet = transactions.getWallet();
    console.log(await wallet?.getNonce());
    const contract = new ethers.Contract(
        "0xc7bFD302CFDa2cbA31A9eDb2818C9E8E268F24B8",
        ABI,
        wallet
    );
    const result = await contract.get();
    console.log(Object.values(result));
}
