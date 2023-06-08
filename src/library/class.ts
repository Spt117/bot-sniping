import { ethers } from "ethers";
import { IParamsSniper, ParamsTransaction, Request } from "./interfaces";
import abiERC20 from "../web3/abis/erc20.json";

export class request implements Request {
    method: string;
    headers: { "Content-Type": string };
    body: string;
    constructor(data: string | object, method: string) {
        this.method = method;
        this.headers = {
            "Content-Type": "application/json",
        };
        this.body = JSON.stringify(data);
    }
}

export class Wallet {
    wallet;
    provider;

    constructor(walletProvider: ethers.Eip1193Provider) {
        this.wallet = walletProvider;
        this.provider = new ethers.BrowserProvider(walletProvider);
    }

    async isConnect() {
        const account = await this.wallet.request({ method: "eth_accounts" });
        return account.length > 0 ? true : false;
    }

    async getChain() {
        const network = await this.provider.getNetwork();
        const data = { name: network.name, id: Number(network.chainId) };
        return data;
    }

    async getSigner() {
        try {
            const signer = await this.provider.getSigner();
            return signer;
        } catch (e) {
            console.log(e);
        }
    }

    async getAddress() {
        const signer = await this.getSigner();
        if (signer) {
            const address = await signer.getAddress();
            return address;
        }
    }

    async getBalance() {
        const address = await this.getAddress();
        if (address) {
            const balance = await this.provider.getBalance(address);
            return Number(Number(ethers.formatEther(balance)).toFixed(4));
        }
    }

    async auth(message: string) {
        const date = new Date();
        const data = message + " " + date;

        try {
            const signer = await this.getSigner();
            if (signer) {
                const signature = await signer.signMessage(data);
                const messageHash = ethers.hashMessage(data);
                const recoveredAddress = ethers.recoverAddress(messageHash, signature);
                if (recoveredAddress.toLowerCase() === signer.address.toLowerCase()) {
                    console.log("La signature est valide !");
                    return true;
                } else {
                    console.log("La signature est invalide.");
                    return false;
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export class GetTransaction {
    transaction: ParamsTransaction;
    blockchain: IParamsSniper;
    constructor(transaction: ParamsTransaction, blockchainRouter: IParamsSniper) {
        this.transaction = transaction;
        this.blockchain = blockchainRouter;
    }

    editTransaction(transaction: ParamsTransaction) {
        this.transaction = transaction;
    }

    getProvider() {
        if (this.blockchain.node) {
            const provider = new ethers.JsonRpcProvider(this.blockchain.node);
            return provider;
        } else {
            const provider = new ethers.JsonRpcProvider(this.blockchain.blockchain.connection);
            return provider;
        }
    }

    getWallet() {
        try {
            const provider = this.getProvider();
            const wallet = new ethers.Wallet(this.transaction.private, provider);
            return wallet;
        } catch (e) {
            console.log(e);
        }
    }

    async getBalance() {
        const provider = this.getProvider();
        try {
            const balance = await provider.getBalance(this.transaction.public);
            return Number(Number(ethers.formatEther(balance)).toFixed(4));
        } catch (e) {
            console.log(e);
        }
    }
}

export class ClassERC20 {
    contract: ethers.Contract;
    transactions: GetTransaction;
    wallet: ethers.Wallet | undefined;

    constructor(token: string, transactions: GetTransaction) {
        this.transactions = transactions;
        this.wallet = this.transactions.getWallet();
        this.contract = new ethers.Contract(token, abiERC20, this.transactions.getProvider());
    }

    async getBalance() {
        try {
            const balance = await this.contract.balanceOf(this.transactions.transaction.public);
            return Number(Number(ethers.formatEther(balance)).toFixed(4));
        } catch (e) {
            console.log(e);
        }
    }

    async getDecimals() {
        try {
            const decimals = await this.contract.decimals();
            return Number(decimals);
        } catch (e) {
            console.log(e);
        }
    }

    async getSymbol() {
        try {
            const symbol = await this.contract.symbol();
            return symbol;
        } catch (e) {
            console.log(e);
        }
    }

    async getName() {
        try {
            const name = await this.contract.name();
            return name;
        } catch (e) {
            console.log(e);
        }
    }

    async getTotalSupply() {
        try {
            const totalSupply = await this.contract.totalSupply();
            return Number(Number(ethers.formatEther(totalSupply)).toFixed(4));
        } catch (e) {
            console.log(e);
        }
    }

    async getAllowance() {
        try {
            const allowance = await this.contract.allowance(
                this.transactions.transaction.public,
                this.transactions.blockchain.router.address
            );
            return Number(Number(ethers.formatEther(allowance)).toFixed(4));
        } catch (e) {
            console.log(e);
        }
    }

    async approve(amount: number) {
        try {
            const contract = this.contract;
            const approve = await contract.approve(this.transactions.blockchain.router, amount);
            return approve;
        } catch (e) {
            console.log(e);
        }
    }

    async transfer(address: string, amount: number) {
        try {
            const contract = this.contract;
            const transfer = await contract.transfer(address, amount);
            return transfer;
        } catch (e) {
            console.log(e);
        }
    }
}
