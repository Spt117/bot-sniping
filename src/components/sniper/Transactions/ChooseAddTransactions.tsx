import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { GetTransaction } from "@/library/class";
import { IDataAccount, Keys, ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import AdminAccount from "./AdminAccount";

export default function ChooseAddTransaction() {
    const { setMyState, dataAccounts, paramsSniper, setDataAccount } = useMyState();
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
        const index = dataAccounts.findIndex((element) => element.data.public === transaction.account.public);
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
                    const element: ParamsTransaction = result[i];
                    const account: Keys = { private: element.private, public: element.public };
                    if (checkTransactionWithPublicAdress(new GetTransaction(account, paramsSniper))) {
                        const nonceAccount = {
                            data: element,
                            methods: new GetTransaction(account, paramsSniper),
                            balance: 0,
                            nonce: 0,
                            approved: false,
                            hasBuy: false,
                            hasSell: false,
                            resultBuy: [],
                            resultSell: [],
                            amountSpendETH: 0,
                            amountCalculate: 0,
                        };
                        setDataAccount((oldDataAccount: IDataAccount[]) => [...oldDataAccount, nonceAccount]);
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
            <AdminAccount />
        </div>
    );
}
