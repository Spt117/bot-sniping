import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect, useState } from "react";

export default function AutoSell({ sell }: { sell: (amount: number) => void }) {
    const { myAccount } = useMyTransaction();
    const [autoSell, setAutoSell] = useState(0);
    const [bool, setBool] = useState(false);

    async function sellWithAutoSell() {
        if (!myAccount) return null;
        if (myAccount.amountSpendETH * autoSell <= myAccount.amountCalculate) {
            sell(100);
        }
    }

    useEffect(() => {
        if (bool) sellWithAutoSell();
    }, [myAccount?.amountCalculate, bool]);

    return (
        <>
            {!bool && (
                <>
                    <h5>Add Auto Sell</h5>
                    <input
                        type="number"
                        placeholder="Auto Sell in multiple"
                        onChange={(e) => setAutoSell(Number(e.target.value))}
                    />
                    <button onClick={() => setBool(true)} disabled={!autoSell}>
                        Activate
                    </button>
                </>
            )}
            {bool && (
                <>
                    <h5>Auto Sell Activate</h5>
                    <p>X {autoSell}</p>
                    <button
                        onClick={() => {
                            setBool(false);
                            setAutoSell(0);
                        }}
                    >
                        Cancel
                    </button>
                </>
            )}
        </>
    );
}
