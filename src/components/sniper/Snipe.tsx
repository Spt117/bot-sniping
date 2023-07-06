import { useMyState } from "@/context/ContextSniper";
import { majDataAccount } from "@/library/fonctions";
import { IParamsSniper } from "@/library/interfaces";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { buyWithEth, sellWithEth } from "@/sniper/uniswapV2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import Spinner from "../Spinner";
import Contrat from "./Contrat";
import Infos from "./Infos";
import ManagerComponent from "./ManagerComponent";
import ERC20 from "./Transactions/ERC20";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import { ethers } from "ethers";
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
        setProvider,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
        if (dataAccounts.length === 0) {
            setMyState(1);
            dispatch(myOverlay(true));
        }
        if (sniper.node) {
            let provider;
            if (sniper.node.startsWith("ws://") || sniper.node.startsWith("wss://")) {
                provider = new ethers.WebSocketProvider(sniper.node);
            } else {
                provider = new ethers.JsonRpcProvider(sniper.node);
            }
            setProvider(provider);
        } else setProvider(new ethers.JsonRpcProvider(sniper.blockchain.connection));
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
                            {/* <hr /> */}
                            {/* <button onClick={sell}>Sell All {isSelling && <Spinner />} </button> */}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
