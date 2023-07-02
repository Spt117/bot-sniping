import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";

export default function ResultSell() {
    const { paramsSniper } = useMyState();
    const { myAccount } = useMyTransaction();

    // function getTransactionCost() {
    //     let result = 0;
    //     for (let i = 0; i < myAccount!.resultBuy.length; i++) {
    //         const transaction = myAccount?.resultBuy[i];
    //         const cost = transaction!.gasPrice * transaction!.gasUsed;
    //         result += Number(ethers.formatEther(cost));
    //     }
    //     console.log(`Frais de transaction : ${result.toFixed(4)} ${paramsSniper.blockchain.symbol}`);
    // }

    return (
        <div className="accounts-containers">
            {myAccount?.resultSell.map((transaction) => (
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
