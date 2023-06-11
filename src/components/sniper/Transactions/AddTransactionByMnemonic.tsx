import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import { paramTransaction } from "@/library/constantes";
import { addNonce, getAddresses } from "@/library/fonctions";
import { Keys, ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AddTransactionByMnemonic() {
    const [mnemonic, setMnemonic] = useState({ myMnemonic: "", number: 0 });
    const { setMyState, paramsSniper, setDataAccount } = useMyState();
    const dispatch = useDispatch();

    function closeComponent() {
        setMyState(0);
        dispatch(myOverlay(false));
    }

    async function addAcounts() {
        const accounts = await getAddresses(mnemonic.myMnemonic, mnemonic.number);
        closeComponent();
        for (let i = 0; i < accounts.length; i++) {
            const newTransaction: ParamsTransaction = { ...paramTransaction };
            const account: Keys = { private: accounts[i].private, public: accounts[i].public };
            newTransaction.public = accounts[i].public;
            newTransaction.private = accounts[i].private;
            const transactionWithNonce = await addNonce(new GetTransaction(account, paramsSniper), newTransaction);
            setDataAccount((oldDataAccount) => [
                ...oldDataAccount,
                { data: transactionWithNonce, methods: new GetTransaction(account, paramsSniper), balance: 0 },
            ]);
        }
    }

    function checkNumberAccounts() {
        const button = document.querySelector("#button-getAccounts") as HTMLButtonElement;
        if (mnemonic.number < 1 || mnemonic.number > 100) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    }
    useEffect(() => {
        checkNumberAccounts();
    }, [mnemonic.number]);

    return (
        <div className="addTransaction">
            <Close functionClose={closeComponent} />
            <h4>Add Transaction By Mnemonic</h4>
            <input
                type="text"
                placeholder="Mnemonic"
                onChange={(e) => setMnemonic({ ...mnemonic, myMnemonic: e.target.value })}
            />{" "}
            <br />
            <input
                type="number"
                placeholder="Number of account"
                onChange={(e) => setMnemonic({ ...mnemonic, number: Number(e.target.value) })}
            />{" "}
            <br />
            <button id="button-getAccounts" onClick={addAcounts}>
                Get accounts
            </button>
        </div>
    );
}
