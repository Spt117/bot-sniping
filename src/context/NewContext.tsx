import { paramSniper } from "@/library/constantes";
import { IParamsSniper, IERC20, IDataAccount } from "@/library/interfaces";
import { ethers } from "ethers";
import { ReactNode, createContext, useContext, useMemo, useReducer } from "react";

// Définition du type de l'état initial
interface InitialState {
    myState: number;
    paramsSniper: IParamsSniper;
    boolTransactions: boolean;
    dataERC20: IERC20 | null;
    isSniping: boolean;
    dataAccounts: IDataAccount[];
    isSelling: boolean;
    provider: ethers.WebSocketProvider | ethers.JsonRpcProvider;
}

// Définition des types des actions
type Action =
    | { type: "SET_MY_STATE"; payload: number }
    | { type: "SET_PARAMS_SNIPER"; payload: IParamsSniper }
    | { type: "SET_BOOL_TRANSACTIONS"; payload: boolean }
    | { type: "SET_DATA_ERC20"; payload: IERC20 | null }
    | { type: "SET_IS_SNIPING"; payload: boolean }
    | { type: "SET_DATA_ACCOUNT"; payload: IDataAccount[] }
    | { type: "SET_IS_SELLING"; payload: boolean }
    | { type: "SET_PROVIDER"; payload: ethers.WebSocketProvider | ethers.JsonRpcProvider };

// Reducer
const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case "SET_MY_STATE":
            return { ...state, myState: action.payload };
        case "SET_PARAMS_SNIPER":
            return { ...state, paramsSniper: action.payload };
        case "SET_BOOL_TRANSACTIONS":
            return { ...state, boolTransactions: action.payload };
        case "SET_DATA_ERC20":
            return { ...state, dataERC20: action.payload };
        case "SET_IS_SNIPING":
            return { ...state, isSniping: action.payload };
        case "SET_DATA_ACCOUNT":
            return { ...state, dataAccounts: action.payload };
        case "SET_IS_SELLING":
            return { ...state, isSelling: action.payload };
        case "SET_PROVIDER":
            return { ...state, provider: action.payload };
        default:
            return state;
    }
};

// Création du contexte
const MyStateContext = createContext({});

// Composant fournisseur de contexte
interface MyStateProviderProps {
    children: ReactNode;
}

export const MyStateProvider = ({ children }: MyStateProviderProps) => {
    const initialState: InitialState = {
        myState: 0,
        paramsSniper: paramSniper,
        boolTransactions: true,
        dataERC20: null,
        isSniping: false,
        dataAccounts: [],
        isSelling: false,
        provider: new ethers.JsonRpcProvider(paramSniper.blockchain.connection),
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setMyState = (value: number) => {
        dispatch({ type: "SET_MY_STATE", payload: value });
    };

    const setParamsSniper = (value: IParamsSniper) => {
        dispatch({ type: "SET_PARAMS_SNIPER", payload: value });
    };

    const setBoolTransactions = (value: boolean) => {
        dispatch({ type: "SET_BOOL_TRANSACTIONS", payload: value });
    };

    const setDataERC20 = (value: IERC20 | null) => {
        dispatch({ type: "SET_DATA_ERC20", payload: value });
    };

    const setIsSniping = (value: boolean) => {
        dispatch({ type: "SET_IS_SNIPING", payload: value });
    };

    const setDataAccount = (value: IDataAccount[]) => {
        dispatch({ type: "SET_DATA_ACCOUNT", payload: value });
    };

    const setIsSelling = (value: boolean) => {
        dispatch({ type: "SET_IS_SELLING", payload: value });
    };

    const setProvider = (value: ethers.WebSocketProvider | ethers.JsonRpcProvider) => {
        dispatch({ type: "SET_PROVIDER", payload: value });
    };

    const contextValue = useMemo(
        () => ({
            myState: state.myState,
            paramsSniper: state.paramsSniper,
            boolTransactions: state.boolTransactions,
            dataERC20: state.dataERC20,
            isSniping: state.isSniping,
            dataAccounts: state.dataAccounts,
            isSelling: state.isSelling,
            provider: state.provider,
            setMyState,
            setParamsSniper,
            setBoolTransactions,
            setDataERC20,
            setIsSniping,
            setDataAccount,
            setIsSelling,
            setProvider,
        }),
        [state]
    );

    return <MyStateContext.Provider value={contextValue}>{children}</MyStateContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useMyState = () => {
    const context = useContext(MyStateContext);
    if (!context) {
        throw new Error("useMyState must be used within a MyStateProvider");
    }
    return context;
};
