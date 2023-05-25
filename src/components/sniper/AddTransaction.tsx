import { useMyState } from "@/context/Context";
import { paramTransaction } from "@/library/constantes";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import ParamTransaction from "./ParamTransaction";

export default function AddTransaction({ setParams }: { setParams: Function }) {
    const { setMyState } = useMyState();
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

    return (
        <div className="addTransaction">
            <Close functionClose={close} />
            <h4>Add your account</h4>
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

                <ParamTransaction
                    newTransaction={newTransaction}
                    setNewTransaction={setNewTransaction}
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
