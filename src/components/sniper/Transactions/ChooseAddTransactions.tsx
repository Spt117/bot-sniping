import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import { addNonce } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function ChooseAddTransaction() {
    const { setMyState, setMyTransactions, paramsSniper, myTransactions } = useMyState();
    const dispatch = useDispatch();
    const fileInput = useRef<HTMLInputElement>(null);

    function setComponent(number: number) {
        setMyState(number);
        dispatch(myOverlay(false));
    }

    function getFile() {
        fileInput.current?.click();
    }

    function checkTransactionWithPublicAdress(transaction: GetTransaction) {
        const index = myTransactions.findIndex(
            (element) => element.transaction.public === transaction.transaction.public
        );
        if (index === -1) {
            return true;
        } else {
            return false;
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files![0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const file = event.target?.result;
            if (file !== null && typeof file === "string") {
                const result = JSON.parse(file);
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    if (checkTransactionWithPublicAdress(new GetTransaction(element, paramsSniper))) {
                        const transactions = await addNonce(new GetTransaction(element, paramsSniper));
                        setMyTransactions((oldTransactions: GetTransaction[]) => [...oldTransactions, transactions]);
                    }
                }
            } else {
                console.log("File content is not a string or is null");
            }
        };
        reader.readAsText(file);
        setComponent(0);
    }

    return (
        <div className="addTransaction" id="chooseAddTransaction">
            <Close functionClose={() => setComponent(0)} />
            <h4>Choose your way</h4>
            <button className="button-chooseAddTransaction" onClick={() => setMyState(2)}>
                Add Manually
            </button>
            <br />
            <button className="button-chooseAddTransaction" onClick={getFile} title=".json file or .txt file">
                Import file
            </button>
            <input ref={fileInput} type="file" onChange={(e) => handleFileChange(e)} id="file" className="inputfile" />{" "}
            <button className="button-chooseAddTransaction" onClick={() => setMyState(3)}>
                Get Model
            </button>
            <br />
            <button className="button-chooseAddTransaction" onClick={() => setMyState(4)}>
                Add by Mnemonic phrase
            </button>
        </div>
    );
}
