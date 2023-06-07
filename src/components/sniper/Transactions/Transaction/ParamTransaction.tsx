import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";
import EditGas from "./EditGas";

export default function ParamTransaction() {
    const { paramsSniper } = useMyState();
    const { myTransaction, setMyTransaction, mySymbol, setMySymbol, myAccount } = useMyTransaction();

    useEffect(() => {
        getSymbol();
        console.log(myTransaction);
        console.log(myAccount);
    }, [myTransaction.amountIsToken]);

    function getSymbol() {
        if (myTransaction.amountIsToken) {
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
                    checked={myTransaction.amountIsToken}
                    onChange={(e) =>
                        setMyTransaction({
                            ...myTransaction,
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
                    setMyTransaction({
                        ...myTransaction,
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
                    setMyTransaction({
                        ...myTransaction,
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
                    setMyTransaction({
                        ...myTransaction,
                        repeat: Number(e.target.value),
                    })
                }
            />
            <br />

            <EditGas property="gasBuy" />
        </>
    );
}
