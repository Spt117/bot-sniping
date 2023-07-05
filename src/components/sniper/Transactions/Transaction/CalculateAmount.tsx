import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { majDataAccount } from "@/library/fonctions";
import { calculAmountOut } from "@/sniper/uniswapV2";
import { useEffect, useRef, useState } from "react";

export default function CalculateAmount() {
    const { myAccount } = useMyTransaction();
    const { paramsSniper, dataERC20, dataAccounts, setDataAccount, provider } = useMyState();
    const [block, setBlock] = useState<number>(0);

    const intervalRef = useRef<NodeJS.Timeout>(); // Nous utilisons useRef pour stocker l'ID de l'intervalle

    async function calcul() {
        try {
            if (myAccount && dataERC20 && !myAccount?.hasSell) {
                const amount = await calculAmountOut(myAccount, dataERC20, myAccount.balance);
                const newDataAccounts = [...dataAccounts];
                const index = newDataAccounts.findIndex((e) => e.data.public === myAccount.data.public);
                if (amount) newDataAccounts[index].amountCalculate = amount;
                const blockNumber = await provider.getBlockNumber();
                setBlock(blockNumber);
                setDataAccount(newDataAccounts);
            }
            if (myAccount?.hasSell) {
                clearInterval(intervalRef.current);
                console.log("Clear calcul");
            }
        } catch (e) {
            console.log(e);
        }
    }

    function interval() {
        if (myAccount?.hasBuy) intervalRef.current = setInterval(calcul, 3000);
    }

    useEffect(() => {
        setAmountspentEth();
    }, [myAccount?.resultBuy.length]);

    function setAmountspentEth() {
        let amountspentEth = 0;
        if (!myAccount) return;
        for (let i = 0; i < myAccount.resultBuy.length; i++) {
            amountspentEth += myAccount.resultBuy[i].amount1in;
        }
        majDataAccount(dataAccounts, myAccount!, setDataAccount, undefined, undefined, amountspentEth);
    }

    useEffect(() => {
        interval();
    }, [myAccount?.hasBuy]);

    return (
        <>
            <div className="items">
                <div>If sell in block {block + 1}</div>
                <output>
                    {myAccount?.amountCalculate.toFixed(4)} {paramsSniper.blockchain.symbol}
                </output>
            </div>
            {myAccount && (
                <div className="items">
                    <div>Profit</div>
                    <output>X {(myAccount.amountCalculate / myAccount.amountSpendETH).toFixed(2)}</output>
                </div>
            )}
        </>
    );
}
