import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce, getBalancesToken } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Sell() {
    const { myAccount, myERC20 } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20 } = useMyState();
    const [bools, setBools] = useState({ isSell: false, isApproval: false });

    async function afterSell() {
        if (!myAccount || !dataERC20) return;
        const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        const addNewNonce = await addNonce(myAccount);
        addNewNonce.hasSell = true;
        dataAccounts[index] = addNewNonce;
        getBalancesToken(dataAccounts, dataERC20, setDataAccount);
    }

    async function sell(percent: number = 100) {
        if (!myAccount || !dataERC20) return null;
        setBools({ ...bools, isSell: true });
        const amount = myAccount.balance * 0.99999 * (percent / 100);
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
        await isApproval();
    }

    async function isApproval() {
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.methods.blockchain.router.address);
            if (allowance && allowance > 0) {
                myAccount.approved = true;
                const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
                dataAccounts[index] = myAccount;
            }
        }
    }

    useEffect(() => {
        isApproval();
    }, [myERC20]);

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
                        {myAccount?.balance} {dataERC20?.symbol}
                    </output>
                </div>
            </div>
            <button onClick={() => sell()}>Sell {bools.isSell && <Spinner />} </button>
            <button onClick={data}>Data</button>
        </div>
    );
}
