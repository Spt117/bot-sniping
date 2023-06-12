import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce, getBalancesToken } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function Sell() {
    const { myAccount, myAccountERC20, setMyAccountERC20, myERC20, setMyAccount } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20 } = useMyState();

    async function majDataAccounts() {
        if (!myAccount || !dataERC20) return;
        const addNewNonce = await addNonce(myAccount);
        addNewNonce.hasSell = true;
        const newDataAccounts = [...dataAccounts];
        const index = newDataAccounts.findIndex((item) => item.data.public === addNewNonce.data.public);
        newDataAccounts[index] = addNewNonce;
        setDataAccount(newDataAccounts);
        getBalancesToken(dataAccounts, dataERC20, setDataAccount);
    }

    async function sell(percent: number = 100) {
        setMyAccountERC20({ ...myAccountERC20, isSell: true });
        if (myAccountERC20 && myAccount && dataERC20?.decimals) {
            const amount = myAccount.balance * 0.99999 * (percent / 100);
            const amountBigInt = ethers.parseUnits(amount.toString(), dataERC20.decimals);
            const receip = await swapTokensForETHOnce(myAccount, dataERC20?.address, amountBigInt);
            console.log(receip);
            await majDataAccounts();
            setMyAccountERC20({ ...myAccountERC20, isSell: false });
            console.log("endSell");
        }
    }

    async function approve() {
        setMyAccountERC20({ ...myAccountERC20, isApproval: true });
        if (myERC20 && myAccount) {
            await myERC20.approve(myAccount.methods.blockchain.router.address);
            await isApproval();
        }
        setMyAccountERC20({ ...myAccountERC20, isApproval: false });
    }

    async function isApproval() {
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.methods.blockchain.router.address);
            if (allowance && allowance > 0) {
                const newAccount = { ...myAccount };
                newAccount.approved = true;
                setMyAccount(newAccount);
            }
        }
    }

    useEffect(() => {
        isApproval();
    }, [myERC20]);

    return (
        <div className="accounts-containers">
            <div className="items-header">
                {!myAccount?.approved && (
                    <div className="items">
                        <button id={`button-approve-${myAccount?.data.public}`} onClick={approve}>
                            Approve {myAccountERC20.isApproval === true && <Spinner />}
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
            <button onClick={() => sell()}>Sell {myAccountERC20.isSell && <Spinner />} </button>
        </div>
    );
}
