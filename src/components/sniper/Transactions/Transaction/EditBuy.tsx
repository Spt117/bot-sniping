import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import EditGas from "./EditGas";

export default function EditBuy({ setBool }: { setBool: Function }) {
    const { paramsSniper } = useMyState();
    const { mySymbol, setMySymbol, myAccount, setMyAccount } = useMyTransaction();
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

    function editTransaction<K extends keyof ParamsTransaction>(props: K, value: ParamsTransaction[K]) {
        if (!myAccount) return;
        const newAccount = { ...myAccount };
        newAccount.data[props] = value;
        setMyAccount(newAccount);
    }

    return (
        <div className="editTransaction">
            <Close functionClose={closeEdit} />
            <h4>Set your transaction</h4>

            <div className="labelChekbox">
                <input
                    className="isToken"
                    id="isToken"
                    type="checkbox"
                    placeholder="isToken"
                    checked={myAccount?.data.amountIsToken}
                    onChange={(e) => editTransaction("amountIsToken", e.target.checked)}
                />
                <label className="isToken" htmlFor="isToken">
                    Set amount in token
                </label>
            </div>
            <input
                type="number"
                name="amount"
                placeholder={`Amount in ${mySymbol}`}
                onChange={(e) => editTransaction("amount", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="slippage"
                placeholder="Slippage %"
                onChange={(e) => editTransaction("slippagePercent", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="repeat"
                placeholder="Repeat"
                onChange={(e) => editTransaction("repeat", Number(e.target.value))}
            />
            <br />

            <EditGas property="gasBuy" />
            <br />
            <button className="button" onClick={closeEdit}>
                Set Transaction
            </button>
        </div>
    );
}
