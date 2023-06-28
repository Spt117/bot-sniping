import { useMyState } from "@/context/ContextSniper";
import { ITransactionResult } from "@/library/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abiUniswapV2Pair from "../../../../web3/abis/uniswapV2Pair.json";
import { useMyTransaction } from "@/context/ContextTransaction";
import { majDataAccount } from "@/library/fonctions";

export default function ResultBuy() {
    const { dataAccounts, dataERC20, setDataAccount, paramsSniper } = useMyState();
    const { myAccount } = useMyTransaction();
    const [buys, setBuys] = useState<ITransactionResult[]>([]);

    useEffect(() => {
        if (myAccount && myAccount.resultBuy.length > 0) getBuy();
    }, [dataAccounts]);

    function getBuy() {
        const iface = new ethers.Interface(abiUniswapV2Pair.abi);
        let newBuys: ITransactionResult[] = [];
        for (let i = 0; i < myAccount!.resultBuy.length; i++) {
            myAccount?.resultBuy[i].logs.forEach((log) => {
                try {
                    const logCopy = { ...log, topics: [...log.topics] };
                    const parsedLog = iface.parseLog(logCopy);

                    if (parsedLog?.name === "Swap") {
                        const amountToken = ethers.formatEther(parsedLog.args.amount0Out);
                        const amountEthSwapped = ethers.formatEther(parsedLog.args.amount1In);
                        // const amountTokenSwapped = ethers.formatEther(parsedLog.args.amount0In);
                        // console.log(`Montant d'ETH échangé : ${amountEthSwapped}`);
                        // console.log(`Montant de tokens échangé : ${amountTokenSwapped}`);
                        const isInArray = newBuys.find((item) => item.hash === myAccount.resultBuy[i].hash);
                        if (!isInArray) {
                            newBuys.push({
                                amountETH: Number(amountEthSwapped),
                                amountToken: Number(amountToken),
                                hash: myAccount.resultBuy[i].hash,
                            });
                        }
                    }
                } catch (err) {
                    // Pas un log d'événement Uniswap, ignore
                }
            });
            if (myAccount?.resultBuy[i].status === 0) {
                newBuys.push({
                    amountETH: 0,
                    amountToken: 0,
                    hash: myAccount.resultSell[i].hash,
                });
            }
        }
        setBuys(newBuys);
    }

    useEffect(() => {
        setAmountspentEth();
    }, [buys.length]);

    function setAmountspentEth() {
        let amountspentEth = 0;
        for (let i = 0; i < buys.length; i++) {
            amountspentEth += buys[i].amountETH;
        }
        majDataAccount(dataAccounts, myAccount!, setDataAccount, undefined, undefined, amountspentEth);
    }

    return (
        <div className="accounts-containers">
            {buys.map((transaction) => (
                <div className="items-header" key={transaction.hash}>
                    {transaction.amountETH !== 0 && (
                        <>
                            <div className="items">
                                <div>Tokens win with sold</div>
                                <output>
                                    {transaction.amountToken.toFixed(4)} {dataERC20?.symbol}
                                </output>
                            </div>
                            <div className="items">
                                <div>Spent</div>
                                <output>
                                    {transaction.amountETH.toFixed(4)} {paramsSniper.blockchain.symbol}
                                </output>
                            </div>
                        </>
                    )}
                    <div className="items">
                        <div>Check{transaction.amountETH === 0 && " failed "} Transaction</div>
                        <output>
                            <a
                                title="Check Transaction"
                                target="_blank"
                                href={`${myAccount?.methods.blockchain.blockchain.addressExplorer}tx/${transaction.hash}`}
                            >
                                Explorer
                            </a>
                        </output>
                    </div>
                </div>
            ))}
        </div>
    );
}
