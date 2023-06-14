import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Sell() {
    const { myAccount, myERC20 } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20 } = useMyState();
    const [bools, setBools] = useState({ isSell: false, isApproval: false });

    async function afterSell() {
        if (!myAccount || !dataERC20) return;
        const newArray = [...dataAccounts];
        const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        newArray[index].hasSell = true;
        setDataAccount(newArray);
    }

    async function sell(percent: number = 100) {
        if (!myAccount || !dataERC20 || !dataERC20.decimals) return null;
        setBools({ ...bools, isSell: true });
        const amount = myAccount.balance * (percent / 100) * 0.99999;
        const amountBigInt = ethers.parseUnits(amount.toString(), dataERC20.decimals);
        const receip = await swapTokensForETHOnce(myAccount, dataERC20?.address, amountBigInt);
        console.log(receip);
        await afterSell();
        setBools({ ...bools, isSell: false });
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

    function data() {
        console.log(dataAccounts);
        console.log(myAccount);
    }

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                {!myAccount?.approved && (
                    <div className="items">
                        <button id={`button-approve-${myAccount?.data.public}`} onClick={approve}>
                            Approve {bools.isApproval === true && <Spinner />}
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
            </div>
            <button onClick={() => sell()}>Sell {bools.isSell && <Spinner />} </button>
            <button onClick={data}>Data</button>
        </div>
    );
}
