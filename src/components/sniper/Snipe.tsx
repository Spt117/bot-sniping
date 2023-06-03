import { useMyState } from "@/context/Context";
import { IParamsSniper } from "@/library/interfaces";
import { buy } from "@/library/uniswapV2";
import { myDisableSniper } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerTransactions from "./Transactions/ManagerTransactions";
// "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080"

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const { setMyParamSniper, myTransactions, boolTransactions, setBoolTransactions } = useMyState();
    const [contract, setContract] = useState("");

    useEffect(() => {
        setMyParamSniper(sniper);
    }, []);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    async function test() {
        const button = document.getElementById("test");
        button?.setAttribute("disabled", "true");
        await buy(myTransactions, contract);
        button?.removeAttribute("disabled");
    }

    return (
        <div className="contain-snipe">
            <div className="contain-close">
                <Close functionClose={disableSniper} />
                <ManagerTransactions />

                {myTransactions.length > 0 && (
                    <>
                        {boolTransactions && <GeneratorTransaction />}
                        {!boolTransactions && (
                            <button onClick={() => setBoolTransactions(true)}>Show Transactions</button>
                        )}
                        <br />
                        <br />
                        <input type="text" onChange={(e) => setContract(e.target.value)} />
                    </>
                )}
                <br />
                <br />
                <button id="test" onClick={test}>
                    Test
                </button>
            </div>
        </div>
    );
}
