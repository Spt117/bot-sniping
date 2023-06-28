import { useMyState } from "@/context/ContextSniper";
import { IParamsSniper } from "@/library/interfaces";
import { myAccount, myDisableSniper, myOverlay } from "@/redux/actions";
import { scanMempool } from "@/sniper/mempool";
import calculAmountOut, { buyWithEth, sellWithEth } from "@/sniper/uniswapV2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerComponent from "./ManagerComponent";
import Contrat from "./Contrat";
import ERC20 from "./Transactions/ERC20";
import { majDataAccount } from "@/library/fonctions";
import Spinner from "../Spinner";
import Infos from "./Infos";
// "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080"

export default function Snipe({ sniper }: { sniper: IParamsSniper }) {
    const dispatch = useDispatch();
    const {
        dataAccounts,
        setDataAccount,
        setMyParamSniper,
        boolTransactions,
        paramsSniper,
        setMyState,
        setBoolTransactions,
        dataERC20,
        isSniping,
        setIsSniping,
        setIsSelling,
        isSelling,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
        if (dataAccounts.length === 0) {
            setMyState(1);
            dispatch(myOverlay(true));
        }
    }, []);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    async function endBuy() {
        setIsSniping(false);
        console.log("end buy");
    }

    async function buy() {
        if (dataERC20?.address) {
            setIsSniping(true);
            await buyWithEth(dataAccounts, dataERC20?.address, majDataAccount, setDataAccount);
            endBuy();

            // await scanMempool(myTransactions, dataERC20?.address, buyWithEth, endBuy);
        }
    }

    async function sell() {
        setIsSelling(true);
        if (dataERC20?.address) await sellWithEth(dataAccounts, dataERC20, 100);
        setIsSelling(false);
        console.log("end sell");
    }

    return (
        <>
            <ManagerComponent />
            <div className="contain-snipe">
                <div className="contain-close">
                    <Close functionClose={disableSniper} data="Close this snipe" />
                    <div className="contain-button">
                        <button
                            className="button"
                            onClick={() => {
                                setMyState(1);
                                dispatch(myOverlay(true));
                            }}
                        >
                            Add Account
                        </button>
                    </div>
                    <Infos />
                    {dataAccounts.length > 0 && (
                        <>
                            {boolTransactions && <GeneratorTransaction />}
                            {!boolTransactions && (
                                <button onClick={() => setBoolTransactions(true)}>{`Show Transaction${
                                    dataAccounts.length > 1 ? "s" : ""
                                }`}</button>
                            )}
                            <br />
                            {!dataERC20?.address && <Contrat />}
                        </>
                    )}

                    <br />
                    {dataERC20?.address && <ERC20 />}
                    <br />
                    {!isSniping && dataERC20?.address && (
                        <>
                            <button id="buy" onClick={buy}>
                                Buy
                            </button>
                            <hr />
                            <button onClick={sell}>Sell All {isSelling && <Spinner />} </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
