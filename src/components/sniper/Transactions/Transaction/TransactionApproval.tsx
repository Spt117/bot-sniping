import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditApproval from "./EditApproval";
import Gas from "./Gas";
import { ParamsTransaction } from "@/library/interfaces";
import Spinner from "@/components/Spinner";

export default function TransactionApproval() {
    const { myTransaction, myAccount, myERC20, setMyTransaction } = useMyTransaction();
    const [bool, setBool] = useState(false);
    const [boolApproval, setBoolApproval] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    useEffect(() => {
        isApproval();
    }, [myERC20]);

    async function isApproval() {
        console.log(myAccount?.transaction.public);
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.blockchain.router.address);
            if (allowance && allowance > 0) {
                const button = document.getElementById(`button-approve-${myAccount?.transaction.public}`);
                button?.setAttribute("disabled", "true");
                let newTransaction = { ...myTransaction };
                newTransaction.isApproval = true;
                setMyTransaction(newTransaction as ParamsTransaction);
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

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items">
                <div>Is Approval</div>
                <hr />
                <output>{myTransaction.isApproval ? "Yes" : "No"}</output>
            </div>
            <div className="items">
                <button id={`button-approve-${myAccount?.transaction.public}`} onClick={approve}>
                    Approve {boolApproval && <Spinner />}
                </button>
            </div>

            <Gas gas={myTransaction.gasApprove} />

            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditApproval setBool={setBool} />}
        </div>
    );
}
