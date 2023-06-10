import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Gas from "./Gas";

export default function TransactionBuy() {
    const { myAccount } = useMyTransaction();

    // function setTransaction(prop: "amount" | "slippagePercent" | "repeat", value: number) {
    //     setMyTransaction({ ...myTransaction, [prop]: value });
    // }

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myAccount.data.gasBuy} />
            </div>
        </div>
    );
}
