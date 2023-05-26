import { StaticImageData } from "next/image";

declare global {
    interface Window {
        ethereum: any;
    }
}

export interface Network {
    name: string;
    id: number | null;
}

interface NetworkInfo {
    name: string;
    logo?: StaticImageData;
    symbol: string;
    connection: string;
    chainId?: number;
}

export interface Networks {
    [key: string]: NetworkInfo;
}

export interface Request {
    method: string;
    headers: { [key: string]: string };
    body: string;
}

export interface IParamsSniper {
    blockchain: NetworkInfo;
    router: RouterDetails;
    id: number;
    disable: boolean;
}

export interface AppState {
    isConnect: boolean;
    overlay: boolean;
    account: string | null;
    chain: Network;
    balance: number;
    addASniper: boolean;
    composantSniper: IParamsSniper[];
}
interface RouterDetails {
    name: string;
    address: string;
    networks: string[];
}

export interface Routers {
    [key: string]: RouterDetails;
}

export interface Keys {
    private: string;
    public: string;
}
export interface Gas {
    gasLimit: number;
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
    nonce?: number;
}

export interface ParamsTransaction {
    private: string;
    public: string;
    gas: Gas;
    amountIsToken: boolean;
    slippagePercent: number;
    amount: number;
    repeat: number;
    secondsDelay?: number;
    useContract: boolean;
    contractAddress?: string;
}
