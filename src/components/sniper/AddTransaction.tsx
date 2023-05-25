import { useMyState } from "@/context/Context";
import { paramTransaction } from "@/library/constantes";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";

export default function AddTransaction({ setParams }: { setParams: Function }) {
    const { setMyState, mySymbol } = useMyState();
    const dispatch = useDispatch();
    const [newTransaction, setNewTransaction] =
        useState<ParamsTransaction>(paramTransaction);

    function close() {
        setMyState(0);
        dispatch(myOverlay(false));
    }

    function addItem(newItem: ParamsTransaction) {
        setParams((oldParams: ParamsTransaction[]) => [...oldParams, newItem]);
        close();
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
        <div className="addTransaction">
            <Close functionClose={close} />
            <h4>Add a transaction</h4>
            <div>
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
                    name="amount"
                    placeholder={`Amount in ${mySymbol}`}
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
                    onChange={(e) =>
                        setGas("maxFeePerGas", Number(e.target.value))
                    }
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
                <br />
                <button
                    className="button"
                    onClick={() => addItem(newTransaction)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
