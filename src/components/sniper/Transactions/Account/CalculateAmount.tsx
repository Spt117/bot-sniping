import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { majDataAccount } from "@/library/fonctions";
import { calculAmountOut, simulateSwapTokensForETHOnce } from "@/sniper/uniswapV2";
import { useEffect, useRef, useState } from "react";

export default function CalculateAmount() {
    const { myAccount } = useMyTransaction();
    const { paramsSniper, dataERC20, dataAccounts, setDataAccount, provider } = useMyState();
    const [block, setBlock] = useState<number>(0);

    const intervalRef = useRef<NodeJS.Timeout>(); // Nous utilisons useRef pour stocker l'ID de l'intervalle

    async function getSimulateAmount() {
        try {
            if (myAccount && dataERC20) {
                console.log("calcul");

                // const amount = await calculAmountOut(myAccount, dataERC20, myAccount.balance);
                const amount = await simulateSwapTokensForETHOnce(myAccount, dataERC20, myAccount.balance * 0.9999);
                const newDataAccounts = [...dataAccounts];
                const index = newDataAccounts.findIndex((e) => e.data.public === myAccount.data.public);
                if (amount) newDataAccounts[index].amountCalculate = amount;
                const blockNumber = await provider.getBlockNumber();
                setBlock(blockNumber);
                setDataAccount(newDataAccounts);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function interval() {
        getSimulateAmount();
        intervalRef.current = setInterval(getSimulateAmount, 1000);
    }

    function calculProfit() {
        if (!myAccount) return 0;
        let amountReceived: number = myAccount.amountCalculate;
        for (let i = 0; i < myAccount.resultSell.length; i++) {
            amountReceived += myAccount.resultSell[i].amount1out;
        }
        const profit = amountReceived / myAccount.amountSpendETH;
        return profit;
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
        if (myAccount?.hasBuy) interval();
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [myAccount?.resultBuy.length]);

    useEffect(() => {
        if (myAccount?.hasSell) {
            clearInterval(intervalRef.current);
            console.log("Clear calcul");
        }
    }, [myAccount?.resultSell.length]);

    if (myAccount && myAccount.hasBuy)
        return (
            <>
                <div className="items">
                    <div>If sell in block {block + 1}</div>
                    <output>
                        {myAccount?.amountCalculate.toFixed(4)} {paramsSniper.blockchain.symbol}
                    </output>
                </div>
                <div className="items">
                    <div>Profit</div>
                    <output>X {calculProfit().toFixed(2)}</output>
                </div>
            </>
        );
    return null;
}
