import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import ParamTransaction from "./ParamTransaction";
import Close from "@/components/Close";
import { useMyTransaction } from "@/context/ContextTransaction";

export default function editTransaction({ setBool }: { setBool: Function }) {
    const { myTransaction, setMyTransaction } = useMyTransaction();
    const dispatch = useDispatch();

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }

    function editTransaction() {
        closeEdit();
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <ParamTransaction transaction={myTransaction} setTransaction={setMyTransaction} />
            <br />
            <button className="button" onClick={editTransaction}>
                Set Transaction
            </button>
        </div>
    );
}
