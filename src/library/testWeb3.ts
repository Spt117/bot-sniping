import { ethers } from "ethers";
import ABI from "../abi/testAbi.json";

const provider = new ethers.JsonRpcProvider(process.env.infura);

// console.log(wallet);

// const contrat = "0x395c6a5f1BFdF072163174e7F169B90D26bD0e93";
const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";

export async function getTokenBalance() {
    const contract = new ethers.Contract(contrat, ABI, provider);
    const result = await contract.retrieve();
    console.log(Number(result));
}

const transactionParameters = {
    gasLimit: 26624n,
    gasPrice: undefined,
    maxPriorityFeePerGas: 1000000000n,
    maxFeePerGas: 1000000016n,
};

export async function stored(num: number) {
    console.log("test");

    const wallet = new ethers.Wallet(process.env.privateKey!, provider);
    const contract = new ethers.Contract(contrat, ABI, wallet);

    const tx = await contract.store(num, { transactionParameters });

    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log("Transaction was mined in block", receipt.blockNumber);
    getTokenBalance();
}
