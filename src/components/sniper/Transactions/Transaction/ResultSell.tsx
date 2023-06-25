import { useMyState } from "@/context/ContextSniper";
import { ITransactionResult } from "@/library/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abiUniswapV2Pair from "../../../../web3/abis/uniswapV2Pair.json";
import { useMyTransaction } from "@/context/ContextTransaction";

export default function ResultSell() {
    const { dataAccounts, paramsSniper } = useMyState();
    const { myAccount } = useMyTransaction();
    const [eth, setEth] = useState<ITransactionResult[]>([]);

    useEffect(() => {
        getSell();
        getTransactionCost();
    }, [dataAccounts]);

    function getSell() {
        const iface = new ethers.Interface(abiUniswapV2Pair.abi);
        let newEth: ITransactionResult[] = [];
        for (let i = 0; i < myAccount!.resultSell.length; i++) {
            myAccount?.resultSell[i].logs.forEach((log) => {
                try {
                    const logCopy = { ...log, topics: [...log.topics] };
                    const parsedLog = iface.parseLog(logCopy);

                    if (parsedLog?.name === "Swap") {
                        const amountEthSwapped = ethers.formatEther(parsedLog.args.amount1Out);
                        // const amountTokenSwapped = ethers.formatEther(parsedLog.args.amount0In);
                        // console.log(`Montant d'ETH échangé : ${amountEthSwapped}`);
                        // console.log(`Montant de tokens échangé : ${amountTokenSwapped}`);
                        const isInArray = newEth.find((item) => item.hash === myAccount.resultSell[i].hash);
                        if (!isInArray) {
                            newEth.push({
                                amountETH: Number(amountEthSwapped),
                                amountToken: 0,
                                hash: myAccount.resultSell[i].hash,
                            });
                        }
                    }
                } catch (err) {
                    // Pas un log d'événement Uniswap, ignore
                }
            });
            if (myAccount?.resultSell[i].status === 0) {
                newEth.push({
                    amountETH: 0,
                    amountToken: 0,
                    hash: myAccount.resultSell[i].hash,
                });
            }
        }
        setEth(newEth);
    }

    function getTransactionCost() {
        let result = 0;
        for (let i = 0; i < myAccount!.resultBuy.length; i++) {
            const transaction = myAccount?.resultBuy[i];
            const cost = transaction!.gasPrice * transaction!.gasUsed;
            result += Number(ethers.formatEther(cost));
        }
        console.log(`Frais de transaction : ${result.toFixed(4)} ${paramsSniper.blockchain.symbol}`);
    }

    return (
        <div className="accounts-containers">
            {eth.map((transaction) => (
                <div className="items-header" key={transaction.hash}>
                    {transaction.amountETH !== 0 && (
                        <div className="items">
                            <div>Eth win with sold</div>
                            <output>{transaction.amountETH.toFixed(4)} ETH</output>
                        </div>
                    )}
                    <div className="items">
                        <div>
                            Check
                            {transaction.amountETH === 0 && " failed"} Transaction
                        </div>
                        <output>
                            <a
                                title="Check Transaction"
                                target="_blank"
                                href={`${paramsSniper.blockchain.addressExplorer}tx/${transaction.hash}`}
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
