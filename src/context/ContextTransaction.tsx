import { ClassERC20, GetTransaction } from "@/library/class";
import { accountERC20 } from "@/library/constantes";
import { IAccountERC20, IDataAccount, ParamsTransaction } from "@/library/interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IContextTransaction {
    mySymbol: string;
    setMySymbol: React.Dispatch<React.SetStateAction<string>>;
    myAccount: IDataAccount | null;
    setMyAccount: React.Dispatch<React.SetStateAction<IDataAccount | null>>;
    myERC20: ClassERC20 | null;
    setMyERC20: React.Dispatch<React.SetStateAction<ClassERC20 | null>>;
    myAccountERC20: IAccountERC20 | null;
    setMyAccountERC20: React.Dispatch<React.SetStateAction<IAccountERC20 | null>>;
}
const MyTransaction = createContext<IContextTransaction>({
    mySymbol: "",
    setMySymbol: () => {},
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
    const [myERC20, setMyERC20] = useState<ClassERC20 | null>(null);
    const [myAccount, setMyAccount] = useState<IDataAccount | null>(null);
    const [myAccountERC20, setMyAccountERC20] = useState<IAccountERC20 | null>(null);

    return (
        <MyTransaction.Provider
            value={{
                mySymbol,
                setMySymbol,
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
