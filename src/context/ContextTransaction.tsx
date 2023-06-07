import { GetTransaction } from "@/library/class";
import { paramSniper, paramTransaction } from "@/library/constantes";
import { ParamsTransaction } from "@/library/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IContextTransaction {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
    myTransaction: ParamsTransaction;
    setMyTransaction: React.Dispatch<React.SetStateAction<ParamsTransaction>>;
    myAccount: GetTransaction;
    setMyAccount: React.Dispatch<React.SetStateAction<GetTransaction>>;
}
const MyTransaction = createContext<IContextTransaction>({
    mySymbol: "",
    setMySymbol: () => {},
    myTransaction: paramTransaction,
    setMyTransaction: () => {},
    myAccount: new GetTransaction(paramTransaction, paramSniper),
    setMyAccount: () => {},
});

// Composant fournisseur de contexte
interface myTransactionProviderProps {
    children: ReactNode;
}

export const MyTransactionProvider = ({ children }: myTransactionProviderProps) => {
    const [mySymbol, setMySymbol] = useState<string>("");
    const [myTransaction, setMyTransaction] = useState<ParamsTransaction>(paramTransaction);
    return (
        <MyTransaction.Provider
            value={{
                mySymbol,
                setMySymbol,
                myTransaction,
                setMyTransaction,
                myAccount: new GetTransaction(myTransaction, paramSniper),
                setMyAccount: () => {},
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
