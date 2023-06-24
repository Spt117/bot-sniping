import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { majDataAccount } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { TransactionReceipt, ethers } from "ethers";

export default function Sell() {
    const { myAccount, myERC20, boolsTransaction, setBoolsTransaction } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20, paramsSniper } = useMyState();

    async function afterSell(receipt: TransactionReceipt | null | undefined) {
        if (!myAccount || !dataERC20 || !receipt) return null;
        majDataAccount(dataAccounts, myAccount, setDataAccount, "hasSell", [receipt]);
        // const newArray = [...dataAccounts];
        // const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        // newArray[index].hasSell = true;
        // newArray[index].resultSell = receipt;
        // setDataAccount(newArray);
    }

    async function sell(percent: number = 100) {
        if (!myAccount || !dataERC20 || !dataERC20.decimals) return null;
        setBoolsTransaction({ ...boolsTransaction, isSell: true });
        const amount = myAccount.balance * (percent / 100) * 0.99999;
        const amountBigInt = ethers.parseUnits(amount.toString(), dataERC20.decimals);
        const receipt = await swapTokensForETHOnce(myAccount, dataERC20?.address, amountBigInt);
        await afterSell(receipt);
        setBoolsTransaction({ ...boolsTransaction, isSell: false });
        console.log("endSell");
    }

    async function approve() {
        if (!myERC20 || !myAccount) return null;
        await myERC20.approve(myAccount.methods.blockchain.router.address);
        const newArray = [...dataAccounts];
        myAccount.approved = true;
        const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        newArray[index] = myAccount;
        setDataAccount(newArray);
    }

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                {!myAccount?.approved && (
                    <div className="items">
                        <button id={`button-approve-${myAccount?.data.public}`} onClick={approve}>
                            Approve {boolsTransaction.isApprove === true && <Spinner />}
                        </button>
                    </div>
                )}
                <div className="items">
                    <div>Approved</div>
                    <output>{myAccount?.approved ? "Yes" : "No"}</output>
                </div>
                <div className="items">
                    <div>Balance</div>
                    <output>
                        {myAccount?.balance.toFixed(2)} {dataERC20?.symbol}
                    </output>
                </div>
                {myAccount?.amountSpendETH > 0 && (
                    <div className="items">
                        <div>Total Spent</div>
                        <output>
                            {myAccount?.amountSpendETH.toFixed(4)} {paramsSniper.blockchain.symbol}
                        </output>
                    </div>
                )}
            </div>
            <button onClick={() => sell()}>Sell {boolsTransaction.isSell && <Spinner />} </button>
        </div>
    );
}
