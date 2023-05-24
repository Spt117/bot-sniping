import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditTransaction({
    addressPublic,
    transactionsArray,
    setParams,
    setBool,
}: {
    addressPublic: string;
    transactionsArray: ParamsTransaction[];
    setParams: Function;
    setBool: Function;
}) {
    const dispatch = useDispatch();
    const newArray = [...transactionsArray];
    const index = newArray.findIndex(
        (transaction) => transaction.public === addressPublic
    );
    const [newTransaction, setNewTransaction] = useState<ParamsTransaction>(
        newArray[index]
    );

    function setGas(property: string, value: number) {
        setNewTransaction({
            ...newTransaction,
            gas: {
                ...newTransaction.gas,
                [property]: Number(value),
            },
        });
    }

    function EditTransaction() {
        newArray[index] = {
            ...newArray[index],
            ...newTransaction,
        };
        setBool(false);
        setParams(newArray);
        dispatch(myOverlay(false));
    }

    return (
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
            <br />
            <button onClick={EditTransaction}>Set Transaction</button>
        </div>
    );
}
