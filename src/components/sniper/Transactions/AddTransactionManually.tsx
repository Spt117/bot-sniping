import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import { paramTransaction } from "@/library/constantes";
import { addNonce, isEthereumAddress } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../../Close";

export default function AddTransactionManually() {
    const { setMyState, setDataAccount, paramsSniper, dataAccounts } = useMyState();
    const dispatch = useDispatch();
    const [newTransaction, setNewTransaction] = useState(paramTransaction);

    function close() {
        setMyState(0);
        dispatch(myOverlay(false));
    }

    async function addItem() {
        const account = { public: newTransaction.public, private: newTransaction.private };
        const dataAccount = {
            data: newTransaction,
            methods: new GetTransaction(account, paramsSniper),
            balance: 0,
            nonce: 0,
            approved: false,
            hasBuy: false,
            hasSell: false,
            index: dataAccounts.length,
        };
        const nonce = await addNonce(dataAccount);
        setDataAccount((oldDataAccount) => [...oldDataAccount, nonce]);
        close();
    }

    useEffect(() => {
        checkAdress();
    }, [newTransaction]);

    function checkAdress() {
        isEthereumAddress(newTransaction, dataAccounts);
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
                <button id="newTransactionButton" className="button" onClick={addItem}>
                    Add
                </button>
            </div>
        </div>
    );
}
