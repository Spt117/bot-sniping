import { useMyState } from "@/context/Context";
import { useMySymbol } from "@/context/ContextTransaction";
import { ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";

export default function ParamTransaction({
    newTransaction,
    setNewTransaction,
}: {
    newTransaction: ParamsTransaction;
    setNewTransaction: Function;
}) {
    const { mySymbol, setMySymbol } = useMySymbol();
    const { paramsSniper } = useMyState();
    const [symbol, setTheSymbol] = useState("");

    function setSymbol() {
        if (newTransaction.amountIsToken) {
            setMySymbol("tokens");
            if (mySymbol === "") {
                setTheSymbol("tokens");
            }
        } else {
            setMySymbol(paramsSniper.blockchain.symbol);
            if (mySymbol === "") {
                setTheSymbol(paramsSniper.blockchain.symbol);
            }
        }
    }

    useEffect(() => {
        setSymbol();
    }, [newTransaction.amountIsToken, mySymbol]);

    function setGas(property: string, value: number) {
        setNewTransaction({
            ...newTransaction,
            gas: {
                ...newTransaction.gas,
                [property]: Number(value),
            },
        });
    }

    return (
        <>
            <h4>Set your transaction</h4>

            <div className="labelChekbox">
                <input
                    name="isToken"
                    type="checkbox"
                    placeholder="isToken"
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            amountIsToken: e.target.checked,
                        })
                    }
                />
                <label htmlFor="isToken">Set amount in token</label>
            </div>
            <input
                type="number"
                name="amount"
                placeholder={`Amount in ${mySymbol || symbol}`}
                onChange={(e) =>
                    setNewTransaction({
                        ...newTransaction,
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
                    setNewTransaction({
                        ...newTransaction,
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
                    setNewTransaction({
                        ...newTransaction,
                        repeat: Number(e.target.value),
                    })
                }
            />
            <br />
            <input
                type="number"
                name="gaslimit"
                placeholder="Gaslimit"
                onChange={(e) => setGas("gasLimit", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="maxFeePerGas"
                placeholder="MaxFeePerGas"
                onChange={(e) => setGas("maxFeePerGas", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="maxPriorityFeePerGas"
                placeholder="MaxPriorityFeePerGas"
                onChange={(e) =>
                    setGas("maxPriorityFeePerGas", Number(e.target.value))
                }
            />
        </>
    );
}
