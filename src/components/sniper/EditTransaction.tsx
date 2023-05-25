import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import ParamTransaction from "./ParamTransaction";

export default function EditTransaction({
    addressPublic,
    transactionsArray,
    setParams,
    setBool,
}: {
    addressPublic: string;
    transactionsArray: ParamsTransaction[];
    setParams: Function;
    setBool: Function;
}) {
    const dispatch = useDispatch();
    const newArray = [...transactionsArray];
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
        setParams(newArray);
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
