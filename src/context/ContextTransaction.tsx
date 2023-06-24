import { ClassERC20 } from "@/library/class";
import { initBoolsTransaction } from "@/library/constantes";
import { IDataAccount, ITransaction } from "@/library/interfaces";
import { TransactionReceipt } from "ethers";
import React, { ReactNode, createContext, useContext, useState } from "react";

// Création du contexte
interface IContextTransaction {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
    myAccount: IDataAccount | null;
    setMyAccount: React.Dispatch<React.SetStateAction<IDataAccount | null>>;
    myERC20: ClassERC20 | null;
    setMyERC20: React.Dispatch<React.SetStateAction<ClassERC20 | null>>;
    boolsTransaction: ITransaction;
    setBoolsTransaction: React.Dispatch<React.SetStateAction<ITransaction>>;
}
const MyTransaction = createContext<IContextTransaction>({
    mySymbol: "",
    setMySymbol: () => {},
    myAccount: null,
    setMyAccount: () => {},
    myERC20: null,
    setMyERC20: () => {},
    boolsTransaction: initBoolsTransaction,
    setBoolsTransaction: () => {},
});

// Composant fournisseur de contexte
interface myTransactionProviderProps {
    children: ReactNode;
}

export const MyTransactionProvider = ({ children }: myTransactionProviderProps) => {
    const [mySymbol, setMySymbol] = useState<string>("");
    const [myERC20, setMyERC20] = useState<ClassERC20 | null>(null);
    const [myAccount, setMyAccount] = useState<IDataAccount | null>(null);
    const [boolsTransaction, setBoolsTransaction] = useState<ITransaction>(initBoolsTransaction);

    return (
        <MyTransaction.Provider
            value={{
                mySymbol,
                setMySymbol,
                myAccount,
                setMyAccount,
                myERC20,
                setMyERC20,
                boolsTransaction,
                setBoolsTransaction,
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
