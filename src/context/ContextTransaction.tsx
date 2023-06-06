import { GetTransaction } from "@/library/class";
import { paramSniper, paramTransaction } from "@/library/constantes";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IContextTransaction {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
    myTransaction: GetTransaction;
    setMyTransaction: React.Dispatch<React.SetStateAction<GetTransaction>>;
}
const MyTransaction = createContext<IContextTransaction>({
    mySymbol: "",
    setMySymbol: () => {},
    myTransaction: new GetTransaction(paramTransaction, paramSniper),
    setMyTransaction: () => {},
});

// Composant fournisseur de contexte
interface myTransactionProviderProps {
    children: ReactNode;
}

export const MyTransactionProvider = ({ children }: myTransactionProviderProps) => {
    const [mySymbol, setMySymbol] = useState<string>("");
    const [myTransaction, setMyTransaction] = useState<GetTransaction>(
        new GetTransaction(paramTransaction, paramSniper)
    );

    return (
        <MyTransaction.Provider
            value={{
                mySymbol,
                setMySymbol,
                myTransaction,
                setMyTransaction,
            }}
        >
            {children}
        </MyTransaction.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useMyTransaction = (): IContextTransaction => {
    const context = useContext(MyTransaction);
    if (!context) {
        throw new Error("useMyTransaction must be used within a MyTransactionProvider");
    }
    return context;
};
