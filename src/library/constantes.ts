import { ethers } from "ethers";
import { Gas, Wallet } from "./class";
import ethImage from "../assets/ethereum.png";
import {
    Networks,
    IParamsSniper,
    ParamsTransaction,
    Routers,
} from "./interfaces";
export { wallet };

let theWallet: ethers.Eip1193Provider;

let wallet: Wallet;
if (typeof window !== "undefined") {
    theWallet = window.ethereum;
    wallet = new Wallet(theWallet);
}

export const networks: Networks = {
    goerli: {
        name: "Goerli Testnet",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://goerli.infura.io/v3/${process.env.infura}`,
        chainId: 5,
    },
    sepolia: {
        name: "Sepolia Testnet",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://sepolia.infura.io/v3/${process.env.infura}`,
    },
    mainnet: {
        name: "Ethereum",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://mainnet.infura.io/v3/${process.env.infura}`,
    },
    matic: {
        name: "Polygon",
        symbol: "MATIC",
        connection: `https://polygon-mainnet.infura.io/v3/${process.env.infura}`,
    },
    bnb: {
        name: "Binance Smart Chain",
        symbol: "BNB",
        connection: "",
    },
};

export const routers: Routers = {
    "Uniswap V3": {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        networks: [
            "Ethereum",
            "Goerli Testnet",
            "Polygon",
            "Binance Smart Chain",
        ],
        quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
        factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    },
    PancakeSwap: {
        name: "PancakeSwap",
        address: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
        networks: ["Binance Smart Chain", "Ethereum"],
        quoterAddress: "",
        factoryAddress: "",
    },
};

export const paramTransaction: ParamsTransaction = {
    public: "",
    private: "",
    gas: {
        gasLimit: 500000,
        maxFeePerGas: 22000000000,
        maxPriorityFeePerGas: 1000000000,
    },
    amountIsToken: false,
    slippagePercent: 20,
    amount: 0.01,
    repeat: 1,
    useContract: false,
    contractAddress: "none",
};

export const paramSniper: IParamsSniper = {
    blockchain: {
        name: "",
        symbol: "",
        connection: "",
    },
    router: {
        name: "",
        address: "",
        networks: [],
        quoterAddress: "",
        factoryAddress: "",
    },
    id: 0,
    disable: false,
};

export const myModel = `
[
    {
        "public": "0x0000000000000000000000000000000000000000",
        "private": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "gas": {
            "gasLimit": 500000,
            "maxFeePerGas": 22000000000,
            "maxPriorityFeePerGas": 1000000000
        },
        "amountIsToken": false,
        "slippagePercent": 20,
        "amount": 0,
        "repeat": 1,
        "useContract": false
        "contractAddress": "none",
    },
    {
        "public": "0x0000000000000000000000000000000000000000",
        "private": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "gas": {
            "gasLimit": 500000,
            "maxFeePerGas": 22000000000,
            "maxPriorityFeePerGas": 1000000000
        },
        "amountIsToken": false,
        "slippagePercent": 20,
        "amount": 0,
        "repeat": 1,
        "useContract": false
        "contractAddress": "none",
    }
]`;
