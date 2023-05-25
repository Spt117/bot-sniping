import { ethers } from "ethers";
import { GetTransaction } from "./class";
import { IParamsSniper, ParamsTransaction } from "./interfaces";
import ABI from "../abi/testAbi.json";

export async function getTokenBalance(
    params: ParamsTransaction,
    sniper: IParamsSniper
) {
    try {
        const transactions = new GetTransaction(params, sniper);
        const wallet = transactions.getWallet();
        const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";
        const contract = new ethers.Contract(contrat, ABI, wallet);

        const result = await contract.retrieve();
        console.log(Number(result));

        const tx = await contract.store(50, transactions.transaction.gas);
        console.log("Transaction hash:", tx);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction was mined in block", receipt.blockNumber);

        const result2 = await contract.retrieve();
        console.log(Number(result2));
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
}
