import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import { useMyState } from "@/context/Context";

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
    const { mySymbol } = useMyState();
    const dispatch = useDispatch();
    const newArray = [...transactionsArray];
    const index = newArray.findIndex(
        (transaction) => transaction.public === addressPublic
    );
    const [newTransaction, setNewTransaction] = useState<ParamsTransaction>(
        newArray[index]
    );

    function closeEdit() {
        setBool(false);
        dispatch(myOverlay(false));
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

    function EditTransaction() {
        newArray[index] = {
            ...newArray[index],
            ...newTransaction,
        };
        setParams(newArray);
        closeEdit();
    }

    return (
        <div className="addTransaction">
            <Close functionClose={closeEdit} />
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
            />{" "}
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
            <button className="button" onClick={EditTransaction}>
                Set Transaction
            </button>
        </div>
    );
}
