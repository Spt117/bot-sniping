import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { truncateAddr } from "@/library/fonctions";
import { useState, useEffect } from "react";

export default function Account() {
    const { setMySymbol, setMyTransaction, setMyAccount, myAccount } = useMyTransaction();
    const { paramsSniper, myTransactions, setMyTransactions, isSniping } = useMyState();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (!myAccount?.transaction.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        getBalance();
        if (myAccount) setMyTransaction(myAccount.transaction);
        setMyAccount(myAccount);
    }, [isSniping, myAccount]);

    async function getBalance() {
        const balance = await myAccount?.getBalance();
        if (balance) setBalance(balance);
    }

    function deleteTransaction() {
        const newArray = [...myTransactions];
        const index = newArray.findIndex(
            (transaction) => transaction.transaction.public === myAccount?.transaction.public
        );
        newArray.splice(index, 1);
        setMyTransactions(newArray);
    }
    return (
        <div className="accounts-containers">
            <div className="items">
                Address : <output name="adress">{truncateAddr(myAccount?.transaction.public)}</output>
            </div>
            <div className="items">
                Balance : <output>{`${balance} ${paramsSniper.blockchain.symbol}`}</output>
            </div>
            <div className="divButtonsTransaction">
                <button onClick={deleteTransaction} className="button">
                    Remove
                </button>
            </div>
        </div>
    );
}
