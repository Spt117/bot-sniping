import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useState } from "react";

export default function ParamBuy() {
    const { mySymbol, myTransaction } = useMyTransaction();
    const dispatch = useDispatch();
    const [bool, setBool] = useState(false);

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    return (
        <>
            <div className="itemsTransactions">
                <div>Amount To Buy</div>
                <output>
                    {myTransaction.amount} {mySymbol}
                </output>
            </div>
            <div className="itemsTransactions">
                <div>Slippage</div>
                <output>{myTransaction.slippagePercent}%</output>
            </div>
            <div className="itemsTransactions">
                <div>Repeat</div>
                <output>{myTransaction.repeat}</output>
            </div>
            <div className="itemsTransactions">
                <div>Gas Limit</div>
                <output>{myTransaction.gasBuy.gasLimit}</output>
            </div>
            <div className="itemsTransactions">
                <div>Max Fee Per Gas</div>
                <output>{myTransaction.gasBuy.maxFeePerGas} Gwei</output>
            </div>
            <div className="itemsTransactions">
                <div>Max Priority Fee Per Gas</div>
                <output>{myTransaction.gasBuy.maxPriorityFeePerGas} Gwei</output>
            </div>
            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditTransaction setBool={setBool} />}
        </>
    );
}
