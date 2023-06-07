import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";
import EditGas from "./EditGas";
import { ParamsTransaction } from "@/library/interfaces";

export default function ParamTransaction({
    transaction,
    setTransaction,
}: {
    transaction: ParamsTransaction;
    setTransaction: Function;
}) {
    const { paramsSniper } = useMyState();
    const { mySymbol, setMySymbol } = useMyTransaction();

    useEffect(() => {
        getSymbol();
    }, [transaction.amountIsToken]);

    function getSymbol() {
        if (transaction.amountIsToken) {
            setMySymbol("tokens");
        } else {
            setMySymbol(paramsSniper.blockchain.symbol);
        }
    }

    return (
        <>
            <h4>Set your transaction</h4>

            <div className="labelChekbox">
                <input
                    className="isToken"
                    id="isToken"
                    type="checkbox"
                    placeholder="isToken"
                    checked={transaction.amountIsToken}
                    onChange={(e) =>
                        setTransaction({
                            ...transaction,
                            amountIsToken: e.target.checked,
                        })
                    }
                />
                <label className="isToken" htmlFor="isToken">
                    Set amount in token
                </label>
            </div>
            <input
                type="number"
                name="amount"
                placeholder={`Amount in ${mySymbol}`}
                onChange={(e) =>
                    setTransaction({
                        ...transaction,
                        amount: Number(e.target.value),
                    })
                }
            />
            <br />
            <input
                type="number"
                name="slippage"
                placeholder="Slippage %"
                onChange={(e) =>
                    setTransaction({
                        ...transaction,
                        slippagePercent: Number(e.target.value),
                    })
                }
            />
            <br />
            <input
                type="number"
                name="repeat"
                placeholder="Repeat"
                onChange={(e) =>
                    setTransaction({
                        ...transaction,
                        repeat: Number(e.target.value),
                    })
                }
            />
            <br />

            <EditGas property="gasBuy" />
        </>
    );
}
