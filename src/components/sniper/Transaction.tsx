import { truncateAddr } from "@/library/fonctions";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useEffect, useState } from "react";
import { useMySymbol } from "@/context/ContextTransaction";
import { useMyState } from "@/context/Context";

export function Transaction({ param }: { param: ParamsTransaction }) {
    const { mySymbol, setMySymbol } = useMySymbol();
    const { paramsSniper, myTransactions, setMyTransactions } = useMyState();

    useEffect(() => {
        if (!param.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else setMySymbol("tokens");
    }, []);

    const [bool, setBool] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    function deleteTransaction() {
        const newArray = [...myTransactions];
        const index = newArray.findIndex(
            (transaction) => transaction.public === param.public
        );
        newArray.splice(index, 1);
        setMyTransactions(newArray);
    }

    return (
        <>
            <div className="listTransactions">
                <div className="itemsTransactions">
                    <div>Address</div>
                    <output name="adress">{truncateAddr(param.public)}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Amount</div>
                    <output>
                        {param.amount} {mySymbol}
                    </output>
                </div>
                <div className="itemsTransactions">
                    <div>Slippage</div>
                    <output>{param.slippagePercent}%</output>
                </div>
                <div className="itemsTransactions">
                    <div>Repeat</div>
                    <output>{param.repeat}</output>
                </div>
                <div className="itemsTransactions">
                    <div>gasLimit</div>
                    <output>{param.gas.gasLimit}</output>
                </div>
                <div className="itemsTransactions">
                    <div>maxFeePerGas</div>
                    <output>{param.gas.maxFeePerGas}</output>
                </div>
                <div className="itemsTransactions">
                    <div>maxPriorityFeePerGas</div>
                    <output>{param.gas.maxPriorityFeePerGas}</output>
                </div>
                <div className="divButtonsTransaction">
                    <button className="button" onClick={activeEdit}>
                        Edit
                    </button>
                    <button onClick={deleteTransaction} className="button">
                        Remove
                    </button>
                </div>
                {bool && (
                    <EditTransaction
                        addressPublic={param.public}
                        setBool={setBool}
                    />
                )}
            </div>
        </>
    );
}
