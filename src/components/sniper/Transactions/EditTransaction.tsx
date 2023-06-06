import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../../Close";
import ParamTransaction from "./ParamTransaction";
import { useMyState } from "@/context/ContextSniper";
import { ParamsTransaction } from "@/library/interfaces";

export default function editTransaction({
    addressPublic,

    setBool,
}: {
    addressPublic: string;

    setBool: Function;
}) {
    const { myTransactions, setMyTransactions } = useMyState();
    const dispatch = useDispatch();
    const newArray = [...myTransactions];
    const index = newArray.findIndex((transaction) => transaction.transaction.public === addressPublic);
    const [newTransaction, setNewTransaction] = useState<ParamsTransaction>(newArray[index].transaction);

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }

    function editTransaction() {
        newArray[index].editTransaction(newTransaction);
        setMyTransactions(newArray);
        closeEdit();
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <ParamTransaction newTransaction={newTransaction} setNewTransaction={setNewTransaction} />
            <br />
            <button className="button" onClick={editTransaction}>
                Set Transaction
            </button>
        </div>
    );
}
