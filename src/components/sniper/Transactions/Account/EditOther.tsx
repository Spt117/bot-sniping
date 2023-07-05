import { useMyTransaction } from "@/context/ContextTransaction";
import { ParamsTransaction } from "@/library/interfaces";

export default function EditOther() {
    const { mySymbol, myAccount, setMyAccount } = useMyTransaction();

    function editTransaction<K extends keyof ParamsTransaction>(props: K, value: ParamsTransaction[K]) {
        if (!myAccount) return;
        const newAccount = { ...myAccount };
        newAccount.data[props] = value;
        setMyAccount(newAccount);
    }
    return (
        <>
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
        </>
    );
}
