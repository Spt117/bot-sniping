import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IBooleanContext {
    boolState: boolean;
    setBoolState: React.Dispatch<React.SetStateAction<boolean>>;
}
const BooleanContext = createContext<IBooleanContext>({
    boolState: false,
    setBoolState: () => {},
});

// Composant fournisseur de contexte
interface BooleanProviderProps {
    children: ReactNode;
}

export const BooleanProvider = ({ children }: BooleanProviderProps) => {
    const [boolState, setBoolState] = useState<boolean>(false);

    return (
        <BooleanContext.Provider value={{ boolState, setBoolState }}>
            {children}
        </BooleanContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useBooleanContext = (): IBooleanContext => {
    const context = useContext(BooleanContext);
    if (!context) {
        throw new Error(
            "useBooleanContext must be used within a BooleanProvider"
        );
    }
    return context;
};
