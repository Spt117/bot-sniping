import React, { createContext, useContext, useState, ReactNode } from "react";

// Création du contexte
interface IBooleanContext {
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}
const BooleanContext = createContext<IBooleanContext>({
    state: false,
    setState: () => {},
});

// Composant fournisseur de contexte
interface BooleanProviderProps {
    children: ReactNode;
}

export const BooleanProvider = ({ children }: BooleanProviderProps) => {
    const [state, setState] = useState<boolean>(false);

    return (
        <BooleanContext.Provider value={{ state, setState }}>
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
