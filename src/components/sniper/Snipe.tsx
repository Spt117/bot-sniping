import { useMyState } from "@/context/Context";
import { IParamsSniper } from "@/library/interfaces";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import AddTransactionByMnemonic from "./Transactions/AddTransactionByMnemonic";
import AddTransactionManually from "./Transactions/AddTransactionManually";
import ChooseAddTransaction from "./Transactions/ChooseAddTransactions";
import FileExemple from "./Transactions/FileExemple";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import { buy } from "@/library/uniswapV2";

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const { myState, setMyState, setMyParamSniper, myTransactions, boolTransactions, setBoolTransactions } =
        useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
    }, []);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    function setComponent(number: number) {
        setMyState(number);
        dispatch(myOverlay(true));
    }

    return (
        <div className="contain-snipe">
            <div className="contain-close">
                <Close functionClose={disableSniper} />
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>

                {myState === 1 && <ChooseAddTransaction />}
                {myState === 2 && <AddTransactionManually />}
                {myState === 3 && <FileExemple />}
                {myState === 4 && <AddTransactionByMnemonic />}

                <button className="button" onClick={() => setComponent(1)}>
                    Add Transaction
                </button>
                {myTransactions.length > 0 && (
                    <>
                        {boolTransactions && <GeneratorTransaction />}
                        {!boolTransactions && (
                            <button onClick={() => setBoolTransactions(true)}>Show Transactions</button>
                        )}
                    </>
                )}
                <br />
                <br />
                <button
                    onClick={() => {
                        // buy(myTransactions, "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080");
                        console.log(myTransactions);
                    }}
                >
                    Test
                </button>
            </div>
        </div>
    );
}
