import { IParamsSniper } from "@/library/interfaces";
import { useEffect } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import AddTransaction from "./AddTransaction";
import { useMyState } from "@/context/Context";
import { GeneratorTransaction } from "./GeneratorTransaction";
import { getSnipers, multipleSniper } from "@/library/sniper";
import { GetTransaction } from "@/library/class";
import { networks } from "@/library/constantes";
import { test } from "@/library/uniswapTests";

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const {
        myState,
        setMyState,
        setMyParamSniper,
        myTransactions,
        boolTransactions,
        setBoolTransactions,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
    }, []);

    useEffect(() => {
        console.log(myTransactions);
    }, [myTransactions]);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    function setComponent(number: number) {
        setMyState(number);
        dispatch(myOverlay(true));
    }

    async function test2() {
        const wallet = new GetTransaction(myTransactions[0], sniper);
        test("0x395c6a5f1BFdF072163174e7F169B90D26bD0e93", wallet);
    }

    return (
        <div className="contain-snipe">
            <div className="contain-close">
                <Close functionClose={disableSniper} />
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>
                {myState === 1 && <AddTransaction />}

                <button className="button" onClick={() => setComponent(1)}>
                    Add Transaction
                </button>
                {myTransactions.length > 0 && (
                    <>
                        {boolTransactions && <GeneratorTransaction />}
                        {!boolTransactions && (
                            <button onClick={() => setBoolTransactions(true)}>
                                Show Transactions
                            </button>
                        )}
                    </>
                )}
            </div>
            <button
                onClick={() =>
                    multipleSniper(
                        sniper,
                        myTransactions,
                        "0xc7bFD302CFDa2cbA31A9eDb2818C9E8E268F24B8"
                    )
                }
            >
                Go
            </button>
            <button onClick={test2}>Get</button>
        </div>
    );
}
