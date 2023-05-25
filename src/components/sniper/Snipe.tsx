import { IParamsSniper } from "@/library/interfaces";
import { useEffect } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import AddTransaction from "./AddTransaction";
import { useMyState } from "@/context/Context";
import { GeneratorTransaction } from "./GeneratorTransaction";

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
        </div>
    );
}
