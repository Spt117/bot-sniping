import { ethers } from "ethers";
import { IParamsSniper, Keys, ParamsTransaction, Request } from "./interfaces";
import abiERC20 from "../web3/abis/ERC20.json";

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
    account: Keys;
    blockchain: IParamsSniper;
    provider: ethers.JsonRpcProvider | ethers.WebSocketProvider;
    constructor(
        account: Keys,
        blockchainRouter: IParamsSniper,
        provider: ethers.JsonRpcProvider | ethers.WebSocketProvider
    ) {
        this.account = account;
        this.blockchain = blockchainRouter;
        this.provider = provider;
    }

    getWallet() {
        try {
            const wallet = new ethers.Wallet(this.account.private, this.provider);
            return wallet;
        } catch (e) {
            console.log(e);
        }
    }

    async getBalance() {
        try {
            const balance = await this.provider.getBalance(this.account.public);
            return Number(Number(ethers.formatEther(balance)));
        } catch (e) {
            console.log(e);
        }
    }
}

export class ClassERC20 {
    setterContract: ethers.Contract;
    getterContract: ethers.Contract;
    account: GetTransaction;
    transactions: ParamsTransaction;
    wallet: ethers.Wallet | undefined;
    publicProvider: ethers.JsonRpcProvider | undefined;

    constructor(token: string, account: GetTransaction, transactions: ParamsTransaction) {
        this.account = account;
        this.wallet = this.account.getWallet();
        this.setterContract = new ethers.Contract(token, abiERC20, this.wallet);
        this.transactions = transactions;
        this.publicProvider = new ethers.JsonRpcProvider(this.account.blockchain.blockchain.connection);
        this.getterContract = new ethers.Contract(token, abiERC20, this.publicProvider);
    }

    async getBalance() {
        try {
            const balance = await this.getterContract.balanceOf(this.account.account.public);
            const decimals = (await this.getDecimals()) as number;
            return Number(Number(balance) / 10 ** decimals);
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    async getDecimals() {
        try {
            const decimals = await this.getterContract.decimals();
            return Number(decimals);
        } catch (e) {
            console.log(e);
        }
    }

    async getSymbol() {
        try {
            const symbol = await this.getterContract.symbol();
            return symbol;
        } catch (e) {
            console.log(e);
        }
    }

    async getName() {
        try {
            const name = await this.getterContract.name();
            return name;
        } catch (e) {
            console.log(e);
        }
    }

    async getTotalSupply() {
        try {
            const totalSupply = await this.getterContract.totalSupply();
            return Number(Number(ethers.formatEther(totalSupply)));
        } catch (e) {
            console.log(e);
        }
    }

    async getAllowance(address: string) {
        try {
            const allowance = await this.getterContract.allowance(this.account.account.public, address);
            return Number(Number(ethers.formatEther(allowance)));
        } catch (e) {
            console.log(e);
        }
    }

    async approve(address: string) {
        try {
            const totalSupply = await this.getTotalSupply();
            const decimals = await this.getDecimals();
            if (!totalSupply || !decimals) return;
            const amount = ethers.parseUnits(totalSupply.toString(), decimals);
            const contract = this.setterContract;
            const approve = await contract.approve(address, amount, this.transactions.gasApprove);
            const receipt = await approve.wait();
            return receipt;
        } catch (e) {
            console.log(e);
        }
    }

    async transfer(address: string, amount: number) {
        try {
            const contract = this.setterContract;
            const transfer = await contract.transfer(address, amount);
            return transfer;
        } catch (e) {
            console.log(e);
        }
    }

    async transferFrom(address: string, amount: number) {
        try {
            const contract = this.setterContract;
            const transferFrom = await contract.transferFrom(this.account.account.public, address, amount);
            return transferFrom;
        } catch (e) {
            console.log(e);
        }
    }
}
