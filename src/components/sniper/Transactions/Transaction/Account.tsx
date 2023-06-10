import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { truncateAddr } from "@/library/fonctions";
import { useState, useEffect } from "react";

export default function Account() {
    const { setMySymbol, myAccount, mySymbol, myAccountERC20 } = useMyTransaction();
    const { paramsSniper, setDataAccount, dataAccounts, isSniping } = useMyState();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (!myAccount?.data.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        getBalance();
    }, [isSniping, myAccount]);

    async function getBalance() {
        const balance = await myAccount?.methods.getBalance();
        if (balance) setBalance(balance);
    }

    function deleteTransaction() {
        const newArray = [...dataAccounts];
        const index = newArray.findIndex((dataAccount) => dataAccount.data.public === myAccount?.data.public);
        newArray.splice(index, 1);
        setDataAccount(newArray);
    }

    async function nonce() {
        const nonce = await myAccount?.methods.getWallet()?.getNonce();
        console.log("nonce " + nonce);
    }

    return (
        <div className="accounts-containers">
            <div className="items-header">
                <div className="items">
                    <div>Adress</div>
                    <output name="adress">{truncateAddr(myAccount?.data.public)}</output>
                </div>
                <div className="items">
                    <div>Balance</div>
                    <output>{`${balance} ${paramsSniper.blockchain.symbol}`}</output>
                </div>
                <div className="items">
                    <div>Amount To Buy</div>
                    <output>
                        {myAccount?.data.amount} {mySymbol}
                    </output>
                </div>
                <div className="items">
                    <div>Repeat</div>
                    <output>{myAccount?.data.repeat}</output>
                </div>
                <div className="items">
                    <div>Is Approval</div>
                    <output>{myAccount?.data.approved ? "Yes" : "No"}</output>
                </div>
            </div>
            <div className="divButtonsTransaction">
                <button onClick={deleteTransaction} className="button">
                    Remove
                </button>
                <button onClick={nonce}>Nonce</button>
            </div>
        </div>
    );
}
