import { ClassERC20, GetTransaction } from "@/library/class";
import { accountERC20 } from "@/library/constantes";
import { IAccountERC20, ParamsTransaction } from "@/library/interfaces";
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
    myAccountERC20: IAccountERC20;
    setMyAccountERC20: React.Dispatch<React.SetStateAction<IAccountERC20>>;
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
    myAccountERC20: accountERC20,
    setMyAccountERC20: () => {},
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
    const [myAccountERC20, setMyAccountERC20] = useState<IAccountERC20>(accountERC20);

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
                myAccountERC20,
                setMyAccountERC20,
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
