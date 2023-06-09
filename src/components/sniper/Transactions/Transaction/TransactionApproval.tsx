import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditApproval from "./EditApproval";
import Gas from "./Gas";
import { ParamsTransaction } from "@/library/interfaces";
import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";

export default function TransactionApproval() {
    const { myTransaction, myAccount, myERC20, setMyTransaction } = useMyTransaction();
    const { isSniping } = useMyState();
    const [bool, setBool] = useState(false);
    const [boolApproval, setBoolApproval] = useState(false);
    const [balance, setBalance] = useState(0);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    useEffect(() => {
        isApproval();
        getBalance();
    }, [myERC20, isSniping]);

    async function isApproval() {
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.blockchain.router.address);
            if (allowance && allowance > 0) {
                const button = document.getElementById(`button-approve-${myAccount?.transaction.public}`);
                button?.setAttribute("disabled", "true");
                setMyTransaction({ ...myTransaction, isApproval: true } as ParamsTransaction);
            }
        }
    }

    async function approve() {
        setBoolApproval(true);
        if (myERC20 && myAccount) {
            await myERC20.approve(myAccount.blockchain.router.address);
            await isApproval();
        }
        setBoolApproval(false);
    }

    async function getBalance() {
        if (myERC20 && myAccount) {
            const balance = await myERC20.getBalance();
            if (balance) setBalance(balance);
        }
    }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items">
                <div>Is Approval</div>
                <output>{myTransaction.isApproval ? "Yes" : "No"}</output>
            </div>
            <div className="items">
                <button id={`button-approve-${myAccount?.transaction.public}`} onClick={approve}>
                    Approve {boolApproval && <Spinner />}
                </button>
            </div>
            <div className="items">
                <div>Balance</div>
                <output>{balance}</output>
            </div>
            {!myTransaction.isApproval && (
                <>
                    <Gas gas={myTransaction.gasApprove} />

                    <button className="button" onClick={activeEdit}>
                        Edit
                    </button>
                </>
            )}
            {bool && <EditApproval setBool={setBool} />}
        </div>
    );
}
