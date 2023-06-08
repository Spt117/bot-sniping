import { GetTransaction } from "@/library/class";
import { paramSniper } from "@/library/constantes";
import { IERC20, IParamsSniper } from "@/library/interfaces";
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
    isSniping: boolean;
    setIsSniping: React.Dispatch<React.SetStateAction<boolean>>;
    resultSnipe: [];
    setResultSnipe: React.Dispatch<React.SetStateAction<[]>>;
    dataERC20: IERC20 | null;
    setDataERC20: React.Dispatch<React.SetStateAction<IERC20 | null>>;
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
    isSniping: false,
    setIsSniping: () => {},
    resultSnipe: [],
    setResultSnipe: () => {},
    dataERC20: null,
    setDataERC20: () => {},
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
    const [dataERC20, setDataERC20] = useState<IERC20 | null>(null);
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
                isSniping,
                setIsSniping,
                resultSnipe,
                setResultSnipe,
                dataERC20,
                setDataERC20,
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
