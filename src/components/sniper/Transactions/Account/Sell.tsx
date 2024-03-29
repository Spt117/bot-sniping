import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { majDataAccount } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import CalculateAmount from "./CalculateAmount";
import { useEffect, useState } from "react";
import ButtonSell from "./ButtonSell";
import StopLoss from "./StopLoss";
import AutoSell from "./AutoSell";

export default function Sell() {
    const { myAccount, myERC20, boolsTransaction, setBoolsTransaction } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20, paramsSniper, isSniping } = useMyState();
    const [disabled, setDisabled] = useState<boolean>(false);

    async function sell(percent: number) {
        if (!myAccount || !dataERC20 || !dataERC20.decimals) return null;
        setBoolsTransaction({ ...boolsTransaction, isSell: true });
        const amount = myAccount.balance * (percent / 100) * 0.9999;
        const amountBigInt = ethers.parseUnits(amount.toString(), dataERC20.decimals);
        const receipt = await swapTokensForETHOnce(myAccount, dataERC20?.address, amountBigInt);
        if (receipt) majDataAccount(dataAccounts, myAccount, setDataAccount, "hasSell", [receipt], undefined, percent);
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

    function disabledButtons() {
        if (boolsTransaction.isSell || isSniping) setDisabled(true);
        else if (myAccount?.hasSell) setDisabled(true);
        else setDisabled(false);
    }

    useEffect(() => {
        disabledButtons();
    }, [boolsTransaction.isSell, myAccount?.hasSell, isSniping]);

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
                <CalculateAmount />
            </div>
            <div className="items">
                <h5>Sell</h5>
                {boolsTransaction.isSell && (
                    <>
                        <Spinner />
                        <br />
                    </>
                )}
                <ButtonSell sell={sell} amount={100} />
                <ButtonSell sell={sell} amount={75} />
                <ButtonSell sell={sell} amount={50} />
                <ButtonSell sell={sell} amount={25} />
                <AutoSell sell={sell} />
                <StopLoss sell={sell} />
            </div>
        </div>
    );
}
