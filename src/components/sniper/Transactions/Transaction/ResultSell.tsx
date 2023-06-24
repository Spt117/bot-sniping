import { useMyState } from "@/context/ContextSniper";
import { ITransactionResult } from "@/library/interfaces";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abiUniswapV2Pair from "../../../../web3/abis/UniswapV2Pair.json";
import { useMyTransaction } from "@/context/ContextTransaction";

export default function ResultSell() {
    const { dataAccounts } = useMyState();
    const { myAccount } = useMyTransaction();
    const [eth, setEth] = useState<ITransactionResult[]>([]);

    useEffect(() => {
        getSell();
        console.log(eth);
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
                            newEth.push({ amount: Number(amountEthSwapped), hash: myAccount.resultSell[i].hash });
                        }
                    }
                } catch (err) {
                    // Pas un log d'événement Uniswap, ignore
                }
            });
        }
        setEth(newEth);
    }

    return (
        <div className="accounts-containers">
            {eth.map((transaction) => (
                <div className="items-header" key={transaction.hash}>
                    <div className="items">
                        <div>Eth win with sold</div>
                        <output>{transaction.amount.toFixed(4)} ETH</output>
                    </div>
                    <div className="items">
                        <div>Check Transaction</div>
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
