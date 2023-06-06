import { useMyState } from "@/context/ContextSniper";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import AddTransactionByMnemonic from "./Transactions/AddTransactionByMnemonic";
import AddTransactionManually from "./Transactions/AddTransactionManually";
import ChooseAddTransaction from "./Transactions/ChooseAddTransactions";
import FileExemple from "./Transactions/FileExemple";

export default function ManagerComponent() {
    const { myState, setMyState, paramsSniper } = useMyState();
    const dispatch = useDispatch();

    return (
        <>
            <div>{paramsSniper.blockchain.name}</div>
            <div>{paramsSniper.router.name}</div>
            <button
                className="button"
                onClick={() => {
                    setMyState(1);
                    dispatch(myOverlay(true));
                }}
            >
                Add Transaction
            </button>
            {myState === 1 && <ChooseAddTransaction />}
            {myState === 2 && <AddTransactionManually />}
            {myState === 3 && <FileExemple />}
            {myState === 4 && <AddTransactionByMnemonic />}
        </>
    );
}
