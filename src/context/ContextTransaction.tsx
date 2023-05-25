import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IMySymbolContext {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
}
const MySymbol = createContext<IMySymbolContext>({
    mySymbol: "",
    setMySymbol: () => {},
});

// Composant fournisseur de contexte
interface mySymbolProviderProps {
    children: ReactNode;
}

export const MySymbolProvider = ({ children }: mySymbolProviderProps) => {
    const [mySymbol, setMySymbol] = useState<string>("");

    return (
        <MySymbol.Provider
            value={{
                mySymbol,
                setMySymbol,
            }}
        >
            {children}
        </MySymbol.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useMySymbol = (): IMySymbolContext => {
    const context = useContext(MySymbol);
    if (!context) {
        throw new Error("useMySymbol must be used within a MySymbolProvider");
    }
    return context;
};
