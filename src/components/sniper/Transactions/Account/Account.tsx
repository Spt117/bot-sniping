import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { truncateAddr } from "@/library/fonctions";
import { useEffect, useState } from "react";

export default function Account() {
    const { setMySymbol, myAccount, mySymbol } = useMyTransaction();
    const { paramsSniper, dataERC20 } = useMyState();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        getBalance();
        getSymbol();
    }, [myAccount?.resultBuy.length, myAccount?.resultSell.length, dataERC20, myAccount?.data.amountIsToken]);

    function getSymbol() {
        if (myAccount?.data.amountIsToken && dataERC20) {
            setMySymbol(dataERC20.symbol);
        } else if (myAccount?.data.amountIsToken) {
            setMySymbol("tokens");
        } else {
            setMySymbol(paramsSniper.blockchain.symbol);
        }
    }

    async function getBalance() {
        const balance = await myAccount?.methods.getBalance();
        if (balance) setBalance(balance);
    }

    if (!myAccount) return null;
    return (
        <div className="items-header">
            <div className="items">
                <div>Account</div>
                <output name="adress">
                    <a
                        title="Check Account"
                        target="_blank"
                        href={`${myAccount.methods.blockchain.blockchain.addressExplorer}address/${myAccount.data.public}`}
                    >
                        {truncateAddr(myAccount.data.public)}
                    </a>
                </output>
            </div>
            <div className="items">
                <div>Balance</div>
                <output>{`${balance.toFixed(3)} ${paramsSniper.blockchain.symbol}`}</output>
            </div>
            <div className="items">
                <div>Amount{myAccount.data.amountIsToken ? " To Buy" : " To Spend"}</div>
                <output>
                    {myAccount.data.amount} {mySymbol}
                </output>
            </div>
            <div className="items">
                <div>Repeat</div>
                <output>{myAccount.data.repeat}</output>
            </div>
            <div className="items">
                <div>Slippage</div>
                <output>{myAccount.data.slippagePercent} %</output>
            </div>
        </div>
    );
}
