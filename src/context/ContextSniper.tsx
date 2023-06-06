import { GetTransaction } from "@/library/class";
import { paramSniper } from "@/library/constantes";
import { IParamsSniper } from "@/library/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IMyStateContext {
    paramsSniper: IParamsSniper;
    setMyParamSniper: React.Dispatch<React.SetStateAction<IParamsSniper>>;
    myState: number;
    setMyState: React.Dispatch<React.SetStateAction<number>>;
    myTransactions: GetTransaction[];
    setMyTransactions: React.Dispatch<React.SetStateAction<GetTransaction[]>>;
    boolTransactions: boolean;
    setBoolTransactions: React.Dispatch<React.SetStateAction<boolean>>;
    contractAddress: string | null;
    setContractAddress: React.Dispatch<React.SetStateAction<string>>;
    isSniping: boolean;
    setIsSniping: React.Dispatch<React.SetStateAction<boolean>>;
    resultSnipe: [];
    setResultSnipe: React.Dispatch<React.SetStateAction<[]>>;
}
const MyState = createContext<IMyStateContext>({
    paramsSniper: paramSniper,
    setMyParamSniper: () => {},
    myState: 0,
    setMyState: () => {},
    myTransactions: [],
    setMyTransactions: () => {},
    boolTransactions: true,
    setBoolTransactions: () => {},
    contractAddress: null,
    setContractAddress: () => {},
    isSniping: false,
    setIsSniping: () => {},
    resultSnipe: [],
    setResultSnipe: () => {},
});

// Composant fournisseur de contexte
interface myStateProviderProps {
    children: ReactNode;
}

export const MyStateProvider = ({ children }: myStateProviderProps) => {
    const [myState, setMyState] = useState<number>(0);
    const [paramsSniper, setMyParamSniper] = useState<IParamsSniper>(paramSniper);
    const [myTransactions, setMyTransactions] = useState<GetTransaction[]>([]);
    const [boolTransactions, setBoolTransactions] = useState<boolean>(true);
    const [contractAddress, setContractAddress] = useState<string>("");
    const [isSniping, setIsSniping] = useState<boolean>(false);
    const [resultSnipe, setResultSnipe] = useState<[]>([]);

    return (
        <MyState.Provider
            value={{
                myState,
                setMyState,
                paramsSniper,
                setMyParamSniper,
                myTransactions,
                setMyTransactions,
                boolTransactions,
                setBoolTransactions,
                contractAddress,
                setContractAddress,
                isSniping,
                setIsSniping,
                resultSnipe,
                setResultSnipe,
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
