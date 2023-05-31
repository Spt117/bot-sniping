import { StaticImageData } from "next/image";

declare global {
    interface Window {
        ethereum: any;
    }
}

export interface INetworkInfo {
    name: string;
    logo?: StaticImageData;
    symbol: string;
    connection: string;
    chainId: number;
}

export interface Request {
    method: string;
    headers: { [key: string]: string };
    body: string;
}

export interface IParamsSniper {
    blockchain: INetworkInfo;
    router: IRouterDetails;
    id: number;
    disable: boolean;
}

export interface AppState {
    isConnect: boolean;
    overlay: boolean;
    account: string | null;
    network: INetworkInfo;
    balance: number;
    addASniper: boolean;
    composantSniper: IParamsSniper[];
}
export interface IRouterDetails {
    name: string;
    address: string;
    quoterAddress: string;
    factoryAddress: string;
    networks: string[];
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
