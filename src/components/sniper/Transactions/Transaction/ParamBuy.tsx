import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";

export default function ParamBuy({ setBool }: { setBool: Function }) {
    const { mySymbol, myTransaction } = useMyTransaction();
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    return (
        <>
            <div className="itemsTransactions">
                <div>Amount To Buy</div>
                <output>
                    {myTransaction.transaction.amount} {mySymbol}
                </output>
            </div>
            <div className="itemsTransactions">
                <div>Slippage</div>
                <output>{myTransaction.transaction.slippagePercent}%</output>
            </div>
            <div className="itemsTransactions">
                <div>Repeat</div>
                <output>{myTransaction.transaction.repeat}</output>
            </div>
            <div className="itemsTransactions">
                <div>Gas Limit</div>
                <output>{myTransaction.transaction.gasBuy.gasLimit}</output>
            </div>
            <div className="itemsTransactions">
                <div>Max Fee Per Gas</div>
                <output>{myTransaction.transaction.gasBuy.maxFeePerGas} Gwei</output>
            </div>
            <div className="itemsTransactions">
                <div>Max Priority Fee Per Gas</div>
                <output>{myTransaction.transaction.gasBuy.maxPriorityFeePerGas} Gwei</output>
            </div>
            <button className="button" onClick={activeEdit}>
                Edit
            </button>
        </>
    );
}
