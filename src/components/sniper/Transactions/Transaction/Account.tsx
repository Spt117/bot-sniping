import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { truncateAddr } from "@/library/fonctions";
import calculAmountOut from "@/sniper/uniswapV2";
import { useEffect, useState } from "react";

export default function Account() {
    const { setMySymbol, myAccount, mySymbol } = useMyTransaction();
    const { paramsSniper, isSniping, dataERC20 } = useMyState();
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

    async function calcul() {
        if (myAccount && dataERC20) await calculAmountOut(myAccount, dataERC20, myAccount.balance);
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
                    <output>{`${balance.toFixed(3)} ${paramsSniper.blockchain.symbol}`}</output>
                </div>
                <div className="items">
                    <div>Amount To Spend</div>
                    <output>
                        {myAccount?.data.amount} {mySymbol}
                    </output>
                </div>
                <div className="items">
                    <div>Repeat</div>
                    <output>{myAccount?.data.repeat}</output>
                </div>
                <div className="items">
                    <div>Slippage</div>
                    <output>{myAccount?.data.slippagePercent} %</output>
                </div>
            </div>
            <button onClick={calcul}>Calcul</button>
        </div>
    );
}
