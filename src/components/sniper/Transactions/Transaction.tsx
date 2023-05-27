import { truncateAddr } from "@/library/fonctions";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useEffect, useState } from "react";
import { useMySymbol } from "@/context/ContextTransaction";
import { useMyState } from "@/context/Context";
import { GetTransaction } from "@/library/class";
import { paramTransaction } from "@/library/constantes";

export function Transaction({ param }: { param: ParamsTransaction }) {
    const dispatch = useDispatch();
    const { mySymbol, setMySymbol } = useMySymbol();
    const { paramsSniper, myTransactions, setMyTransactions } = useMyState();
    const [balance, setBalance] = useState<number>(0);
    const [bool, setBool] = useState(false);

    useEffect(() => {
        if (!param.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        getBalance();
    }, []);

    async function getBalance() {
        const wallet = new GetTransaction(param, paramsSniper);
        const balance = await wallet.getBalance();
        setBalance(balance);
    }

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
                    <div>Gas Limit</div>
                    <output>{param.gas.gasLimit}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Max Fee Per Gas</div>
                    <output>{param.gas.maxFeePerGas}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Max Priority Fee Per Gas</div>
                    <output>{param.gas.maxPriorityFeePerGas}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Your balance</div>
                    <output>
                        {`${balance} ${paramsSniper.blockchain.symbol}`}
                    </output>
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
