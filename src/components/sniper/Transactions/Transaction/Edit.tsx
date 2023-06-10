import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import EditGas from "./EditGas";
import EditOther from "./EditOther";

export default function Edit({ setBool }: { setBool: Function }) {
    const { paramsSniper } = useMyState();
    const { setMySymbol, myAccount } = useMyTransaction();
    const dispatch = useDispatch();

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
    }

    useEffect(() => {
        getSymbol();
    }, [myAccount?.data.amountIsToken]);

    function getSymbol() {
        if (myAccount?.data.amountIsToken) {
            setMySymbol("tokens");
        } else {
            setMySymbol(paramsSniper.blockchain.symbol);
        }
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <h4>Set your transaction</h4>
            <EditOther />
            <h5>Gas Buy</h5>
            <EditGas property="gasBuy" />
            <h5>Gas Approve</h5>
            <EditGas property="gasApprove" />
            <h5>Gas Sell</h5>
            <EditGas property="gasSell" />
            <br />

            <button className="button" onClick={closeEdit}>
                Set Transaction
            </button>
        </div>
    );
}
