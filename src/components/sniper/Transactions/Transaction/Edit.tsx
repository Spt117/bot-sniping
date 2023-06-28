import Close from "@/components/Close";
import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";
import EditGas from "./EditGas";
import EditOther from "./EditOther";

export default function Edit({ setBool }: { setBool: Function }) {
    const { myAccount } = useMyTransaction();
    const dispatch = useDispatch();

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} data="Close setting" />
            <h4>Set your transaction</h4>
            <EditOther />
            <h5>Gas Buy</h5>
            <EditGas property="gasBuy" />
            {!myAccount?.approved && (
                <>
                    <h5>Gas Approve</h5>
                    <EditGas property="gasApprove" />
                </>
            )}
            <h5>Gas Sell</h5>
            <EditGas property="gasSell" />
            <br />

            <button className="button" onClick={closeEdit}>
                Set Transaction
            </button>
        </div>
    );
}
