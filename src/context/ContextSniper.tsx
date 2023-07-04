import { GetTransaction } from "@/library/class";
import { paramSniper } from "@/library/constantes";
import { IDataAccount, IERC20, IParamsSniper } from "@/library/interfaces";
import { ethers } from "ethers";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IMyStateContext {
    paramsSniper: IParamsSniper;
    setMyParamSniper: React.Dispatch<React.SetStateAction<IParamsSniper>>;
    myState: number;
    setMyState: React.Dispatch<React.SetStateAction<number>>;
    boolTransactions: boolean;
    setBoolTransactions: React.Dispatch<React.SetStateAction<boolean>>;
    isSniping: boolean;
    setIsSniping: React.Dispatch<React.SetStateAction<boolean>>;
    isSelling: boolean;
    setIsSelling: React.Dispatch<React.SetStateAction<boolean>>;
    dataERC20: IERC20 | null;
    setDataERC20: React.Dispatch<React.SetStateAction<IERC20 | null>>;
    dataAccounts: IDataAccount[];
    setDataAccount: React.Dispatch<React.SetStateAction<IDataAccount[]>>;
    provider: ethers.WebSocketProvider | ethers.JsonRpcProvider;
    setProvider: React.Dispatch<React.SetStateAction<ethers.WebSocketProvider | ethers.JsonRpcProvider>>;
}

const MyState = createContext<IMyStateContext>({
    paramsSniper: paramSniper,
    setMyParamSniper: () => {},
    myState: 0,
    setMyState: () => {},
    boolTransactions: true,
    setBoolTransactions: () => {},
    isSniping: false,
    setIsSniping: () => {},
    isSelling: false,
    setIsSelling: () => {},
    dataERC20: null,
    setDataERC20: () => {},
    dataAccounts: [],
    setDataAccount: () => {},
    provider: new ethers.JsonRpcProvider(paramSniper.blockchain.connection),
    setProvider: () => {},
});

// Composant fournisseur de contexte
interface myStateProviderProps {
    children: ReactNode;
}

export const MyStateProvider = ({ children }: myStateProviderProps) => {
    const [myState, setMyState] = useState<number>(0);
    const [paramsSniper, setMyParamSniper] = useState<IParamsSniper>(paramSniper);
    const [boolTransactions, setBoolTransactions] = useState<boolean>(true);
    const [dataERC20, setDataERC20] = useState<IERC20 | null>(null);
    const [isSniping, setIsSniping] = useState<boolean>(false);
    const [dataAccounts, setDataAccount] = useState<IDataAccount[]>([]);
    const [isSelling, setIsSelling] = useState<boolean>(false);
    const [provider, setProvider] = useState<ethers.WebSocketProvider | ethers.JsonRpcProvider>(
        new ethers.JsonRpcProvider(paramSniper.blockchain.connection)
    );

    return (
        <MyState.Provider
            value={{
                myState,
                setMyState,
                paramsSniper,
                setMyParamSniper,
                boolTransactions,
                setBoolTransactions,
                isSniping,
                setIsSniping,
                dataERC20,
                setDataERC20,
                dataAccounts,
                setDataAccount,
                isSelling,
                setIsSelling,
                provider,
                setProvider,
            }}
        >
            {children}
        </MyState.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useMyState = (): IMyStateContext => {
    const context = useContext(MyState);
    if (!context) {
        throw new Error("useMyState must be used within a MyStateProvider");
    }
    return context;
};
