import { useMyState } from "@/context/Context";
import { IParamsSniper } from "@/library/interfaces";
import { myDisableSniper } from "@/redux/actions";
import { scanMempool } from "@/sniper/mempool";
import { buyWithEth } from "@/sniper/uniswapV2";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerTransactions from "./Transactions/ManagerTransactions";
import Contrat from "./Contrat";
// "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080"

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const {
        setMyParamSniper,
        myTransactions,
        boolTransactions,
        setBoolTransactions,
        contractAddress,
        isSniping,
        setIsSniping,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
        console.log(contractAddress);
    }, [contractAddress]);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    async function test() {
        if (contractAddress) {
            setIsSniping(true);
            await scanMempool(myTransactions, contractAddress, buyWithEth, () => setIsSniping(false));
        }
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
                        {!contractAddress && <Contrat />}
                    </>
                )}
                <br />
                <br />
                {!isSniping && contractAddress && (
                    <>
                        <p>Contrat {contractAddress}</p>
                        <button id="test" onClick={test}>
                            Sniper
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
