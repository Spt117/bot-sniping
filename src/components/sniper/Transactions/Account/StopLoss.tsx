import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect, useState } from "react";

export default function StopLoss({ sell }: { sell: (amount: number) => void }) {
    const { myAccount } = useMyTransaction();
    const [loss, setLoss] = useState(0);
    const [bool, setBool] = useState(false);

    async function sellWithStopLoss() {
        if (!myAccount) return null;
        if ((myAccount.amountSpendETH * (100 - loss)) / 100 > myAccount.amountCalculate) {
            sell(100);
        }
    }

    useEffect(() => {
        if (bool) sellWithStopLoss();
    }, [myAccount?.amountCalculate, bool]);

    return (
        <>
            {!bool && (
                <>
                    <h5>Add Stop Loss</h5>
                    <input
                        type="number"
                        placeholder="Stop Loss in %"
                        onChange={(e) => setLoss(Number(e.target.value))}
                    />
                    <button onClick={() => setBool(true)} disabled={!loss}>
                        Activate
                    </button>
                </>
            )}
            {bool && (
                <>
                    <h5>Stop Loss Activate</h5>
                    <p>{loss} %</p>
                    <button
                        onClick={() => {
                            setBool(false);
                            setLoss(0);
                        }}
                    >
                        Cancel
                    </button>
                </>
            )}
        </>
    );
}
