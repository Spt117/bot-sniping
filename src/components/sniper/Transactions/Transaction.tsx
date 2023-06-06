import { truncateAddr } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditTransaction from "./EditTransaction";
import { useEffect, useState } from "react";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";

export function Transaction({ myTransaction }: { myTransaction: GetTransaction }) {
    const dispatch = useDispatch();
    const { mySymbol, setMySymbol, setMyTransaction } = useMyTransaction();
    const { paramsSniper, myTransactions, setMyTransactions, isSniping } = useMyState();
    const [balance, setBalance] = useState<number>(0);
    const [bool, setBool] = useState(false);

    useEffect(() => {
        if (!myTransaction.transaction.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        getBalance();
        setMyTransaction(myTransaction);
        console.log(myTransaction);
    }, [isSniping, myTransaction]);

    async function getBalance() {
        const balance = await myTransaction.getBalance();
        if (balance) setBalance(balance);
    }

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    function deleteTransaction() {
        const newArray = [...myTransactions];
        const index = newArray.findIndex(
            (transaction) => transaction.transaction.public === myTransaction.transaction.public
        );
        newArray.splice(index, 1);
        setMyTransactions(newArray);
    }

    return (
        <>
            <div className="listTransactions">
                <div className="itemsTransactions">
                    <div>Address</div>
                    <output name="adress">{truncateAddr(myTransaction.transaction.public)}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Amount</div>
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
                <div className="itemsTransactions">
                    <div>Your balance</div>
                    <output>{`${balance} ${paramsSniper.blockchain.symbol}`}</output>
                </div>
                <div className="divButtonsTransaction">
                    <button className="button" onClick={activeEdit}>
                        Edit
                    </button>
                    <button onClick={deleteTransaction} className="button">
                        Remove
                    </button>
                </div>
                {bool && <EditTransaction addressPublic={myTransaction.transaction.public} setBool={setBool} />}
            </div>
        </>
    );
}
