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

export interface ParamsSniper {
    blockchain: string;
    router: RouterDetails;
    id: number;
    disable: boolean;
}

export interface AppState {
    isConnect: boolean;
    account: string | null;
    chain: Network;
    balance: number;
    addASniper: boolean;
    composantSniper: ParamsSniper[];
}
interface RouterDetails {
    name: string;
    address: string;
    networks: string[];
}

export interface Routers {
    [key: string]: RouterDetails;
}
