import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce } from "@/library/fonctions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function Sell() {
    const { myAccount, myAccountERC20, setMyAccountERC20, myERC20, setMyAccount } = useMyTransaction();
    const { setDataAccount, dataAccounts, dataERC20 } = useMyState();

    async function majDataAccounts() {
        if (!myAccount) return;
        const addNewNonce = await addNonce(myAccount.methods, myAccount.data);
        const newAccount = { ...myAccount };
        newAccount.data = addNewNonce;
        const newDataAccounts = [...dataAccounts];
        const index = newDataAccounts.findIndex((item) => item.data.public === newAccount.data.public);
        newDataAccounts[index] = newAccount;
        setDataAccount(newDataAccounts);
    }

    async function sell() {
        setMyAccountERC20({ ...myAccountERC20, isSell: true });
        if (myAccountERC20 && myAccount && dataERC20?.decimals) {
            const amount = ethers.parseUnits((myAccountERC20.tokenBalance * 0.99999).toString(), dataERC20?.decimals);
            const receip = await swapTokensForETHOnce(myAccount, dataERC20?.address, amount);
            const addNewNonce = await addNonce(myAccount.methods, myAccount.data);
            const newAccount = { ...myAccount };
            newAccount.data = addNewNonce;
            await majDataAccounts();
            setMyAccountERC20({ ...myAccountERC20, isSell: false });
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
                newAccount.data.approved = true;
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
                {!myAccount?.data.approved && (
                    <div className="items">
                        <button id={`button-approve-${myAccount?.data.public}`} onClick={approve}>
                            Approve {myAccountERC20.isApproval === true && <Spinner />}
                        </button>
                    </div>
                )}
                <div className="items">
                    <div>Is Approval</div>
                    <output>{myAccount?.data.approved ? "Yes" : "No"}</output>
                </div>
                <div className="items">
                    <div>Balance</div>
                    <output>
                        {myAccountERC20.tokenBalance} {dataERC20?.symbol}
                    </output>
                </div>
            </div>
            <button onClick={sell}>Sell {myAccountERC20.isSell && <Spinner />} </button>
        </div>
    );
}
