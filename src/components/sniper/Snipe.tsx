import { useMyState } from "@/context/ContextSniper";
import { IParamsSniper } from "@/library/interfaces";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { scanMempool } from "@/sniper/mempool";
import { buyWithEth } from "@/sniper/uniswapV2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerComponent from "./ManagerComponent";
import Contrat from "./Contrat";
// "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080"

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const {
        setMyParamSniper,
        myTransactions,
        boolTransactions,
        paramsSniper,
        setMyState,
        setBoolTransactions,
        contractAddress,
        isSniping,
        setResultSnipe,
        setIsSniping,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
    }, []);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    function endBuy(result: []) {
        setResultSnipe(result);
        setIsSniping(false);
    }

    async function test() {
        if (contractAddress) {
            setIsSniping(true);
            await buyWithEth(myTransactions, contractAddress, endBuy);
            // await scanMempool(myTransactions, contractAddress, buyWithEth, endBuy);
        }
    }

    return (
        <>
            <ManagerComponent />
            <div className="contain-snipe">
                <div className="contain-close">
                    <Close functionClose={disableSniper} />

                    <div>{paramsSniper.blockchain.name}</div>
                    <div>{paramsSniper.router.name}</div>
                    <button
                        className="button"
                        onClick={() => {
                            setMyState(1);
                            dispatch(myOverlay(true));
                        }}
                    >
                        Add Transaction
                    </button>
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
        </>
    );
}
