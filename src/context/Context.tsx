import { paramSniper } from "@/library/constantes";
import { IParamsSniper, ParamsTransaction } from "@/library/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IMyStateContext {
    paramsSniper: IParamsSniper;
    setMyParamSniper: React.Dispatch<React.SetStateAction<IParamsSniper>>;
    myState: number;
    setMyState: React.Dispatch<React.SetStateAction<number>>;
    myTransactions: ParamsTransaction[];
    setMyTransactions: React.Dispatch<
        React.SetStateAction<ParamsTransaction[]>
    >;
    boolTransactions: boolean;
    setBoolTransactions: React.Dispatch<React.SetStateAction<boolean>>;
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
});

// Composant fournisseur de contexte
interface myStateProviderProps {
    children: ReactNode;
}

export const MyStateProvider = ({ children }: myStateProviderProps) => {
    const [myState, setMyState] = useState<number>(0);
    const [paramsSniper, setMyParamSniper] =
        useState<IParamsSniper>(paramSniper);
    const [myTransactions, setMyTransactions] = useState<ParamsTransaction[]>(
        []
    );
    const [boolTransactions, setBoolTransactions] = useState<boolean>(true);

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
