import Close from "@/components/Close";
import EditGas from "./EditGas";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";

export default function EditApproval({ setBool }: { setBool: Function }) {
    const dispatch = useDispatch();
    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }
    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <EditGas property="gasApprove" />
            <br />
            <button className="button" onClick={closeEdit}>
                Set Transaction
            </button>
        </div>
    );
}
