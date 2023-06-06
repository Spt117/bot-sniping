import ethImage from "../assets/ethereum.png";
import { INetworkInfo, IParamsSniper, IRouterDetails, ParamsTransaction } from "./interfaces";

export const networks: INetworkInfo[] = [
    {
        name: "Goerli Testnet",
        logo: ethImage,
        symbol: "ETH",
        // connection: `https://ethereum-goerli-rpc.allthatnode.com`,
        connection: process.env.ankrGoerli,
        chainId: 5,
        wrappedAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        addressExplorer: "https://goerli.etherscan.io/",
    },
    {
        name: "Sepolia Testnet",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://ethereum-sepolia-rpc.allthatnode.com`,
        chainId: 11155111,
        wrappedAddress: "",
    },
    {
        name: "Avalanche",
        symbol: "AVAX",
        connection: "https://api.avax.network/ext/bc/C/rpc",
        chainId: 43114,
        wrappedAddress: "",
    },
    {
        name: "Binance Smart Chain",
        symbol: "BNB",
        connection: "https://bsc-dataseed2.binance.org/",
        chainId: 56,
        wrappedAddress: "",
    },
    {
        name: "Ethereum",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://ethereum-mainnet-rpc.allthatnode.com`,
        chainId: 1,
        wrappedAddress: "",
    },
    {
        name: "Fantom",
        symbol: "FTM",
        connection: "https://rpcapi.fantom.network",
        chainId: 250,
        wrappedAddress: "",
    },

    {
        name: "Polygon",
        symbol: "MATIC",
        connection: `https://polygon-rpc.com`,
        chainId: 137,
        wrappedAddress: "",
    },
];

export const routers: IRouterDetails[] = [
    {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        networks: ["Ethereum", "Goerli Testnet", "Polygon", "Binance Smart Chain"],
        quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
        factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    },
    {
        name: "Uniswap V2",
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        networks: ["Ethereum", "Goerli Testnet", "Polygon", "Binance Smart Chain"],
        quoterAddress: "",
        factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    },
    {
        name: "PancakeSwap",
        address: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
        networks: ["Binance Smart Chain", "Ethereum", "Goerli Testnet"],
        quoterAddress: "",
        factoryAddress: "",
    },
];

export const paramTransaction: ParamsTransaction = {
    public: "",
    private: "",
    gasBuy: {
        gasLimit: 500000,
        maxFeePerGas: 22000000000,
        maxPriorityFeePerGas: 1000000000,
    },
    gasApprove: {
        gasLimit: 500000,
        maxFeePerGas: 22000000000,
        maxPriorityFeePerGas: 1000000000,
    },
    gasSell: {
        gasLimit: 500000,
        maxFeePerGas: 22000000000,
        maxPriorityFeePerGas: 1000000000,
    },
    amountIsToken: false,
    slippagePercent: 20,
    amount: 0.01,
    repeat: 1,
    nonce: 0,
    useContract: false,
    contractAddress: "none",
};

export const paramSniper: IParamsSniper = {
    blockchain: {
        name: "",
        symbol: "",
        connection: "",
        chainId: 0,
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
