import { ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";

export default function AddTransaction({
    setParams,
    params,
}: {
    setParams: Function;
    params: ParamsTransaction[];
}) {
    const [newTransaction, setNewTransaction] = useState<ParamsTransaction>({
        public: "",
        private: "",
        gaslimit: 0,
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
        amountIsToken: false,
        slippagePercent: 20,
        amount: 0.01,
        repeat: 1,
        useContract: false,
    });

    function addItem(newItem: ParamsTransaction) {
        setParams((oldParams: ParamsTransaction[]) => [...oldParams, newItem]);
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
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            gaslimit: Number(e.target.value),
                        })
                    }
                />{" "}
                <br />
                <input
                    type="number"
                    name="maxFeePerGas"
                    placeholder="MaxFeePerGas"
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            maxFeePerGas: Number(e.target.value),
                        })
                    }
                />{" "}
                <br />
                <input
                    type="number"
                    name="maxPriorityFeePerGas"
                    placeholder="MaxPriorityFeePerGas"
                    onChange={(e) =>
                        setNewTransaction({
                            ...newTransaction,
                            maxPriorityFeePerGas: Number(e.target.value),
                        })
                    }
                />
                <button onClick={() => addItem(newTransaction)}>Add</button>
            </div>
        </>
    );
}
