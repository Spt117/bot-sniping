import { truncateAddr } from "@/library/fonctions";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useEffect, useState } from "react";
import { useMySymbol } from "@/context/ContextTransaction";
import { useMyState } from "@/context/Context";

export function Transaction({
    params,
    setParams,
    param,
}: {
    params: ParamsTransaction[];
    setParams: Function;
    param: ParamsTransaction;
}) {
    const { mySymbol, setMySymbol } = useMySymbol();
    const { paramsSniper } = useMyState();

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
                <div>
                    <button className="button" onClick={activeEdit}>
                        Edit
                    </button>
                    {bool && (
                        <EditTransaction
                            setParams={setParams}
                            transactionsArray={params}
                            addressPublic={param.public}
                            setBool={setBool}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
