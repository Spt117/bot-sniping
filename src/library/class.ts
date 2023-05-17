import { ethers } from "ethers";
import { Request } from "./interfaces";

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
        const signer = await this.provider.getSigner();
        return signer;
    }

    async getAddress() {
        const signer = await this.getSigner();
        const address = await signer.getAddress();
        return address;
    }

    async getBalance() {
        const address = await this.getAddress();
        if (address) {
            const balance = await this.provider.getBalance(address);
            return balance;
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
                const recoveredAddress = ethers.recoverAddress(
                    messageHash,
                    signature
                );
                if (
                    recoveredAddress.toLowerCase() ===
                    signer.address.toLowerCase()
                ) {
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
