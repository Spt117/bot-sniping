import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditApproval from "./EditApproval";
import Gas from "./Gas";

export default function TransactionApproval() {
    const { myTransaction, setMyTransaction, myERC20 } = useMyTransaction();
    const [bool, setBool] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    useEffect(() => {
        isApproval();
    }, [myERC20]);

    async function isApproval() {
        if (myERC20) {
            const allowance = await myERC20.getAllowance();
            console.log(myTransaction?.public, allowance);
        }
    }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items">
                <div>Is Approval ?</div>
                <output></output>
            </div>

            <Gas gas={myTransaction.gasApprove} />

            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditApproval setBool={setBool} />}
            <button onClick={isApproval}>test</button>
        </div>
    );
}
