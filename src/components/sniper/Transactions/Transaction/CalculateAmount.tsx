import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import calculAmountOut from "@/sniper/uniswapV2";
import { useEffect, useState, useRef } from "react";

export default function CalculateAmount() {
    const { myAccount } = useMyTransaction();
    const { paramsSniper, dataERC20, dataAccounts, setDataAccount } = useMyState();
    const [block, setBlock] = useState<number>(0);

    const intervalRef = useRef<NodeJS.Timeout>(); // Nous utilisons useRef pour stocker l'ID de l'intervalle

    async function calcul() {
        if (myAccount && dataERC20 && !myAccount?.hasSell) {
            const amount = await calculAmountOut(myAccount, dataERC20, myAccount.balance);
            const newDataAccounts = [...dataAccounts];
            const index = newDataAccounts.findIndex((e) => e.data.public === myAccount.data.public);
            newDataAccounts[index].amountCalculate = amount;
            const blockNumber = await myAccount.methods.getProvider().getBlockNumber();
            setBlock(blockNumber);
            setDataAccount(newDataAccounts);
        }
        if (myAccount?.hasSell) {
            clearInterval(intervalRef.current);
            console.log("Clear calcul");
        }
    }

    function interval() {
        if (myAccount?.hasBuy) intervalRef.current = setInterval(calcul, 3000);
    }

    useEffect(() => {
        interval();
    }, [myAccount?.hasBuy]);

    if (!myAccount?.hasBuy) return null;
    return (
        <>
            <div className="items">
                <div>If sell in block {block + 1}</div>
                <output>
                    {myAccount?.amountCalculate.toFixed(4)} {paramsSniper.blockchain.symbol}
                </output>
            </div>
            <div className="items">
                <div>Multiple</div>
                <output>X {(myAccount?.amountCalculate / myAccount.amountSpendETH).toFixed(2)}</output>
            </div>
        </>
    );
}
