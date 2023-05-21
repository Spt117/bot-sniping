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
    goerli: { name: "Testnet Goerli", logo: ethImage, symbol: "ETH" },
    sepolia: { name: "Testnet Sepolia", logo: ethImage, symbol: "ETH" },
    mainnet: { name: "Ethereum", logo: ethImage, symbol: "ETH" },
    matic: { name: "Polygon", logo: ethImage, symbol: "MATIC" },
    bnb: { name: "Binance Smart Chain", logo: ethImage, symbol: "BNB" },
};

const routers: Routers = {
    "Uniswap V3": {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        networks: ["mainnet", "goerli", "matic", "bnb"],
    },
    PancakeSwap: {
        name: "PancakeSwap",
        address: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
        networks: ["bnb", "mainnet"],
    },
};
