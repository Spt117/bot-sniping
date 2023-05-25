import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import ParamTransaction from "./ParamTransaction";
import { useMyState } from "@/context/Context";

export default function EditTransaction({
    addressPublic,

    setBool,
}: {
    addressPublic: string;

    setBool: Function;
}) {
    const { myTransactions, setMyTransactions } = useMyState();
    const dispatch = useDispatch();
    const newArray = [...myTransactions];
    const index = newArray.findIndex(
        (transaction) => transaction.public === addressPublic
    );
    const [newTransaction, setNewTransaction] = useState<ParamsTransaction>(
        newArray[index]
    );

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }

    function EditTransaction() {
        newArray[index] = {
            ...newArray[index],
            ...newTransaction,
        };
        setMyTransactions(newArray);
        closeEdit();
    }

    return (
        <div className="addTransaction">
            <Close functionClose={closeEdit} />
            <ParamTransaction
                newTransaction={newTransaction}
                setNewTransaction={setNewTransaction}
            />
            <br />
            <button className="button" onClick={EditTransaction}>
                Set Transaction
            </button>
        </div>
    );
}
