import { ClassERC20, GetTransaction } from "@/library/class";
import { paramSniper, paramTransaction } from "@/library/constantes";
import { ParamsTransaction } from "@/library/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IContextTransaction {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
    myTransaction: ParamsTransaction | null;
    setMyTransaction: React.Dispatch<React.SetStateAction<ParamsTransaction | null>>;
    myAccount: GetTransaction | null;
    setMyAccount: React.Dispatch<React.SetStateAction<GetTransaction | null>>;
    myERC20: ClassERC20 | null;
    setMyERC20: React.Dispatch<React.SetStateAction<ClassERC20 | null>>;
}
const MyTransaction = createContext<IContextTransaction>({
    mySymbol: "",
    setMySymbol: () => {},
    myTransaction: null,
    setMyTransaction: () => {},
    myAccount: null,
    setMyAccount: () => {},
    myERC20: null,
    setMyERC20: () => {},
});

// Composant fournisseur de contexte
interface myTransactionProviderProps {
    children: ReactNode;
}

export const MyTransactionProvider = ({ children }: myTransactionProviderProps) => {
    const [mySymbol, setMySymbol] = useState<string>("");
    const [myTransaction, setMyTransaction] = useState<ParamsTransaction | null>(null);
    const [myERC20, setMyERC20] = useState<ClassERC20 | null>(null);
    const [myAccount, setMyAccount] = useState<GetTransaction | null>(null);

    return (
        <MyTransaction.Provider
            value={{
                mySymbol,
                setMySymbol,
                myTransaction,
                setMyTransaction,
                myAccount,
                setMyAccount,
                myERC20,
                setMyERC20,
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
