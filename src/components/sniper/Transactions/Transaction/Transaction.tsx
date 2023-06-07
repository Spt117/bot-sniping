import { truncateAddr } from "@/library/fonctions";
import { useEffect, useState } from "react";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import ParamBuy from "./ParamBuy";

export function Transaction({ myTransaction }: { myTransaction: GetTransaction }) {
    const { setMySymbol, setMyTransaction, setMyAccount } = useMyTransaction();
    const { paramsSniper, myTransactions, setMyTransactions, isSniping } = useMyState();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (!myTransaction.transaction.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        getBalance();
        setMyTransaction(myTransaction.transaction);
        setMyAccount(myTransaction);
    }, [isSniping, myTransaction]);

    async function getBalance() {
        const balance = await myTransaction.getBalance();
        if (balance) setBalance(balance);
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
            <div className="accounts">
                <div className="itemsTransactions">
                    <div>Address</div>
                    <output name="adress">{truncateAddr(myTransaction.transaction.public)}</output>
                </div>
                <div className="itemsTransactions">
                    <div>Your balance</div>
                    <output>{`${balance} ${paramsSniper.blockchain.symbol}`}</output>
                </div>
                <ParamBuy />

                <div className="divButtonsTransaction">
                    <button onClick={deleteTransaction} className="button">
                        Remove
                    </button>
                </div>
            </div>
        </>
    );
}
