import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IMyStateContext {
    myState: number;
    setMyState: React.Dispatch<React.SetStateAction<number>>;
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
}
const MyState = createContext<IMyStateContext>({
    myState: 0,
    setMyState: () => {},
    mySymbol: "",
    setMySymbol: () => {},
});

// Composant fournisseur de contexte
interface myStateProviderProps {
    children: ReactNode;
}

export const MyStateProvider = ({ children }: myStateProviderProps) => {
    const [myState, setMyState] = useState<number>(0);
    const [mySymbol, setMySymbol] = useState<string>("");

    return (
        <MyState.Provider
            value={{ myState, setMyState, mySymbol, setMySymbol }}
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
