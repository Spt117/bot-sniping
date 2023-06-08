import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditBuy from "./EditBuy";
import { useState } from "react";
import Gas from "./Gas";

export default function TransactionBuy() {
    const { mySymbol, myTransaction, setMyTransaction } = useMyTransaction();
    const dispatch = useDispatch();
    const [bool, setBool] = useState(false);

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    // function setTransaction(prop: "amount" | "slippagePercent" | "repeat", value: number) {
    //     setMyTransaction({ ...myTransaction, [prop]: value });
    // }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items">
                <div>Amount To Buy</div>
                <output>
                    {myTransaction.amount} {mySymbol}
                </output>
            </div>
            <div className="items">
                <div>Repeat</div>

                <output>{myTransaction.repeat}</output>
            </div>
            <div className="items">
                <div>Slippage in %</div>

                <output>{myTransaction.slippagePercent} %</output>
            </div>
            <Gas gas={myTransaction.gasBuy} />

            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditBuy setBool={setBool} transaction={myTransaction} setTransaction={setMyTransaction} />}
        </div>
    );
}
