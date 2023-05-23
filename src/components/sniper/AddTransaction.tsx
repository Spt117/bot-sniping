import { paramTransaction } from "@/library/constantes";
import { ParamsTransaction } from "@/library/interfaces";
import { useState } from "react";

export default function AddTransaction({ setParams }: { setParams: Function }) {
    const [newTransaction, setNewTransaction] =
        useState<ParamsTransaction>(paramTransaction);

    function addItem(newItem: ParamsTransaction) {
        setParams((oldParams: ParamsTransaction[]) => [...oldParams, newItem]);
    }

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
            <h4>Add transaction</h4>
            <div className="addTransaction">
                <input
                    type="text"
                    name="addressPublic"
                    placeholder="Public adress (0x...)"
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            public: e.target.value,
                        })
                    }
                />
                <br />
                <input
                    type="text"
                    name="addressPrivate"
                    placeholder="Private adress (0x...)"
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            private: e.target.value,
                        })
                    }
                />
                <br />
                <input
                    type="number"
                    name="gaslimit"
                    placeholder="Gaslimit"
                    onChange={(e) => setGas("gasLimit", Number(e.target.value))}
                />{" "}
                <br />
                <input
                    type="number"
                    name="maxFeePerGas"
                    placeholder="MaxFeePerGas"
                    onChange={(e) =>
                        setGas("maxFeePerGas", Number(e.target.value))
                    }
                />{" "}
                <br />
                <input
                    type="number"
                    name="maxPriorityFeePerGas"
                    placeholder="MaxPriorityFeePerGas"
                    onChange={(e) =>
                        setGas("maxPriorityFeePerGas", Number(e.target.value))
                    }
                />{" "}
                <br />
                <button onClick={() => addItem(newTransaction)}>Add</button>
            </div>
        </>
    );
}
