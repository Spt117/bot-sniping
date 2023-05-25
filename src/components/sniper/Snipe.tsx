import { IParamsSniper, ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";
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
        paramsSniper,
        myTransactions,
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

    function activeParam() {
        setMyState(1);
        dispatch(myOverlay(true));
    }

    return (
        <div className="contain-snipe">
            <div className="contain-close">
                <Close functionClose={disableSniper} />
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>
                {myState === 1 && <AddTransaction />}

                <button className="button" onClick={activeParam}>
                    Add Transaction
                </button>
                <GeneratorTransaction />
            </div>
        </div>
    );
}
