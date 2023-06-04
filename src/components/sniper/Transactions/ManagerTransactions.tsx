import { useMyState } from "@/context/Context";
import AddTransactionByMnemonic from "./AddTransactionByMnemonic";
import AddTransactionManually from "./AddTransactionManually";
import ChooseAddTransaction from "./ChooseAddTransactions";
import FileExemple from "./FileExemple";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";

export default function ManagerTransactions() {
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
