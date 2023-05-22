import { ethers } from "ethers";
import { Wallet } from "./class";
import ethImage from "../assets/ethereum.png";
import { Networks, Routers } from "./interfaces";
export { wallet, networks, routers };

let theWallet: ethers.Eip1193Provider;

let wallet: Wallet;
if (typeof window !== "undefined") {
    theWallet = window.ethereum;
    wallet = new Wallet(theWallet);
}

const networks: Networks = {
    goerli: {
        name: "Goerli Testnet",
        logo: ethImage,
        symbol: "ETH",
        connection: `https://goerli.infura.io/v3/${process.env.infura}`,
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
        logo: ethImage,
        symbol: "MATIC",
        connection: `https://polygon-mainnet.infura.io/v3/${process.env.infura}`,
    },
    bnb: {
        name: "Binance Smart Chain",
        logo: ethImage,
        symbol: "BNB",
        connection: "",
    },
};

const routers: Routers = {
    "Uniswap V3": {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        networks: [
            "Ethereum",
            "Goerli Testnet",
            "Polygon",
            "Binance Smart Chain",
        ],
    },
    PancakeSwap: {
        name: "PancakeSwap",
        address: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
        networks: ["Binance Smart Chain", "Ethereum"],
    },
};
