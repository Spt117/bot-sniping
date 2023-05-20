import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.infura);
let wallet: ethers.Wallet;
let contract: ethers.Contract;

// console.log(wallet);
const ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "num",
                type: "uint256",
            },
        ],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "retrieve",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

// const contrat = "0x395c6a5f1BFdF072163174e7F169B90D26bD0e93";
const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";
if (process.env.privateKey) {
    wallet = new ethers.Wallet(process.env.privateKey, provider);
}

export async function getTokenBalance() {
    contract = new ethers.Contract(contrat, ABI, provider);
    const result = await contract.retrieve();
    console.log(Number(result));
}

const transactionParameters = {
    gasLimit: 26624n,
    gasPrice: undefined,
    maxPriorityFeePerGas: 1000000000n,
    maxFeePerGas: 1000000016n,
};

export async function stored() {
    const tx = await contract.store(333, { transactionParameters });

    console.log("Transaction hash:", tx);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log("Transaction was mined in block", receipt.blockNumber);
}
