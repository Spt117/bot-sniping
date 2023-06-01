import { ethers } from "ethers";
import ABI from "../web3/abis/testAbi.json";

const provider = new ethers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${process.env.infura}`
);

// const contrat = "0x395c6a5f1BFdF072163174e7F169B90D26bD0e93";
const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";

export async function getTokenBalance() {
    const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";
    const contract = new ethers.Contract(contrat, ABI, provider);
    const result = await contract.retrieve();
    console.log(Number(result));
}

const transactionParameters = {
    gasLimit: 27000,
    maxFeePerGas: 22000000000,
    maxPriorityFeePerGas: 1000000000,
};

export async function stored(num: number, tp = transactionParameters) {
    console.log(num);

    const wallet = new ethers.Wallet(process.env.privateKey!, provider);

    const contract = new ethers.Contract(contrat, ABI, wallet);

    const tx = await contract.store(num, {
        gasLimit: tp.gasLimit,
        maxFeePerGas: tp.maxFeePerGas,
        maxPriorityFeePerGas: tp.maxPriorityFeePerGas,
    });

    console.log("Transaction hash:", tx);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log("Transaction was mined in block", receipt.blockNumber);
    getTokenBalance();
}
