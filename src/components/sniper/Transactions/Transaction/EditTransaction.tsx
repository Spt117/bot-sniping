import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import ParamTransaction from "./ParamTransaction";
import Close from "@/components/Close";

export default function editTransaction({ setBool }: { setBool: Function }) {
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
            <ParamTransaction />
            <br />
            <button className="button" onClick={editTransaction}>
                Set Transaction
            </button>
        </div>
    );
}
