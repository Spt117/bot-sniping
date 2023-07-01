import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import { paramTransaction } from "@/library/constantes";
import { isEthereumAddress } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../../Close";
import { IDataAccount } from "@/library/interfaces";

export default function AddTransactionManually() {
    const { setMyState, setDataAccount, paramsSniper, dataAccounts, provider } = useMyState();
    const dispatch = useDispatch();
    const [newTransaction, setNewTransaction] = useState(paramTransaction);

    function close() {
        setMyState(0);
        dispatch(myOverlay(false));
    }

    async function addItem() {
        const account = { public: newTransaction.public, private: newTransaction.private };
        const dataAccount: IDataAccount = {
            data: newTransaction,
            methods: new GetTransaction(account, paramsSniper, provider!),
            balance: 0,
            approved: false,
            hasBuy: false,
            hasSell: false,
            resultBuy: [],
            resultSell: [],
            amountSpendETH: 0,
            amountCalculate: 0,
        };
        setDataAccount((oldDataAccount) => [...oldDataAccount, dataAccount]);
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
