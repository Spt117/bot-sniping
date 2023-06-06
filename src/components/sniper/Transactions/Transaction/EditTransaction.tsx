import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { AppState, ParamsTransaction } from "@/library/interfaces";
import ParamTransaction from "./ParamTransaction";
import { useMyTransaction } from "@/context/ContextTransaction";

export default function editTransaction({
    addressPublic,

    setBool,
}: {
    addressPublic: string;

    setBool: Function;
}) {
    const { myTransactions, setMyTransactions } = useMyState();
    const { myTransaction, setMyTransaction } = useMyTransaction();
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

    useEffect(() => {
        console.log(myTransaction.transaction);
    }, [myTransaction]);

    function test() {
        let newTest = { ...myTransaction.transaction };
        newTest.gasApprove = {
            gasLimit: 0,
            maxFeePerGas: 0,
            maxPriorityFeePerGas: 0,
        };
        myTransaction.editTransaction(newTest);
        console.log(myTransaction);
        console.log(myTransactions);
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <ParamTransaction newTransaction={newTransaction} setNewTransaction={setNewTransaction} />
            <br />
            <button className="button" onClick={editTransaction}>
                Set Transaction
            </button>
            <button onClick={test}>Test</button>
        </div>
    );
}
