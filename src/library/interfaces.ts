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
    connection?: string;
    chainId: number;
    wrappedAddress?: string;
    addressExplorer?: string;
}

export interface Request {
    method: string;
    headers: { [key: string]: string };
    body: string;
}

export interface IParamsSniper {
    blockchain: INetworkInfo;
    router: IRouterDetails;
    node?: string;
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
    gasBuy: Gas;
    gasApprove: Gas;
    gasSell: Gas;
    amountIsToken: boolean;
    slippagePercent: number;
    amount: number;
    repeat: number;
    nonce: number;
    secondsDelay?: number;
    useContract: boolean;
}

export interface IAccountERC20 {
    isSell: boolean;
    isBuy: boolean;
    isApproval: boolean;
    approved: boolean;
    tokenBalance: number;
}

export interface IERC20 {
    name: string;
    symbol: string;
    decimals: number | undefined;
    totalSupply: number | undefined;
    address: string;
}
