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
    logo: StaticImageData;
    symbol: string;
}

export interface Networks {
    [key: string]: NetworkInfo;
}

export interface Request {
    method: string;
    headers: { [key: string]: string };
    body: string;
}

export interface AppState {
    isConnect: boolean;
    account: string | null;
    chain: Network;
    balance: number;
}

export interface Routers {
    [key: string]: {
        address: string;
    };
}