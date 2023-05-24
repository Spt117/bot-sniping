import { truncateAddr } from "@/library/fonctions";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useState } from "react";

export function Transaction({
    params,
    setParams,
    param,
}: {
    params: ParamsTransaction[];
    setParams: Function;
    param: ParamsTransaction;
}) {
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
                    <div>Amout</div>
                    <output>{param.amount}</output>
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
                    <button onClick={activeEdit}>Edit</button>
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
