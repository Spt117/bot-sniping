import Close from "@/components/Close";
import { useMyState } from "@/context/Context";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function ChooseAddTransaction() {
    const { setMyState, setMyTransactions } = useMyState();
    const dispatch = useDispatch();
    const fileInput = useRef<HTMLInputElement>(null);

    function setComponent(number: number) {
        setMyState(number);
        dispatch(myOverlay(false));
    }

    function getFile() {
        fileInput.current?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files![0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (result !== null && typeof result === "string") {
                setMyTransactions((oldTransactions: ParamsTransaction[]) => [
                    ...oldTransactions,
                    ...JSON.parse(result),
                ]);
            } else {
                console.log("File content is not a string or is null");
            }
        };
        reader.readAsText(file);
        setComponent(0);
    }

    return (
        <div className="addTransaction">
            <Close functionClose={() => setComponent(0)} />
            <h4>Choose your way</h4>
            <button
                className="button-chooseAddTransaction"
                onClick={() => setMyState(2)}
            >
                Add Manually
            </button>
            <br />
            <button className="button-chooseAddTransaction" onClick={getFile}>
                Import file
            </button>
            <input
                ref={fileInput}
                type="file"
                onChange={(e) => handleFileChange(e)}
                id="file"
                className="inputfile"
            />{" "}
            <button
                className="button-chooseAddTransaction"
                onClick={() => setMyState(3)}
            >
                Get Model
            </button>
            <br />
            <button className="button-chooseAddTransaction">
                Add by Mnemonic phrase
            </button>
        </div>
    );
}