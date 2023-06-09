import { myOverlay } from "@/redux/actions";
import EditGas from "./EditGas";
import { useDispatch } from "react-redux";
import Close from "@/components/Close";

export default function EditSell({ setBool }: { setBool: Function }) {
    const dispatch = useDispatch();

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }
    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <EditGas property="gasSell" />
            <br />
            <button className="button" onClick={closeEdit}>
                Set Transaction
            </button>
        </div>
    );
}
