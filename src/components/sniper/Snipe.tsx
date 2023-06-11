import { useMyState } from "@/context/ContextSniper";
import { IParamsSniper } from "@/library/interfaces";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { scanMempool } from "@/sniper/mempool";
import { buyWithEth, sellWithEth } from "@/sniper/uniswapV2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerComponent from "./ManagerComponent";
import Contrat from "./Contrat";
import ERC20 from "./Transactions/ERC20";
import { getBalancesToken, majNonces } from "@/library/fonctions";
import Spinner from "../Spinner";
import BalanceToken from "./Transactions/BalanceTokens";
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
        setResultSnipe,
        setIsSniping,
        setIsSelling,
        isSelling,
        resultSnipe,
    } = useMyState();

    useEffect(() => {
        setMyParamSniper(sniper);
    }, []);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    async function endBuy(result: []) {
        setResultSnipe(result);
        const newDatas = await majNonces(dataAccounts);
        setDataAccount(newDatas);

        balanceToken();
        setIsSniping(false);

        console.log("endbuy");
    }

    function balanceToken() {
        if (dataERC20) {
            getBalancesToken(dataAccounts, dataERC20, setDataAccount);
        }
    }

    async function buy() {
        if (dataERC20?.address) {
            setIsSniping(true);
            await buyWithEth(dataAccounts, dataERC20?.address, endBuy);

            // await scanMempool(myTransactions, dataERC20?.address, buyWithEth, endBuy);
        }
    }

    async function sell() {
        setIsSelling(true);
        if (dataERC20?.address) await sellWithEth(dataAccounts, dataERC20, 100);
        balanceToken();
        setIsSelling(false);
        console.log("end sell");
    }

    return (
        <>
            <ManagerComponent />
            <BalanceToken />
            <div className="contain-snipe">
                <div className="contain-close">
                    <Close functionClose={disableSniper} data="Close this snipe" />

                    <div>{paramsSniper.blockchain.name}</div>
                    <div>{paramsSniper.router.name}</div>
                    <button
                        className="button"
                        onClick={() => {
                            setMyState(1);
                            dispatch(myOverlay(true));
                        }}
                    >
                        Add Account
                    </button>
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
                            <p>Contrat {dataERC20?.address}</p>
                            <button id="buy" onClick={buy}>
                                Buy
                            </button>{" "}
                            <hr />
                            <button onClick={sell}>Sell All {isSelling && <Spinner />} </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
