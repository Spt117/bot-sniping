import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Gas from "./Gas";
import EditSell from "./EditSell";

export default function TransactionSell() {
    const { myTransaction } = useMyTransaction();
    const [bool, setBool] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <Gas gas={myTransaction.gasSell} />

            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditSell setBool={setBool} />}
        </div>
    );
}
