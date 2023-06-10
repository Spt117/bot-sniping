import { useMyState } from "@/context/ContextSniper";
import { IDataAccount, IParamsSniper } from "@/library/interfaces";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { scanMempool } from "@/sniper/mempool";
import { buyWithEth } from "@/sniper/uniswapV2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../Close";
import GeneratorTransaction from "./Transactions/GeneratorTransaction";
import ManagerComponent from "./ManagerComponent";
import Contrat from "./Contrat";
import ERC20 from "./Transactions/Transaction/ERC20";
import { addNonce } from "@/library/fonctions";
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
        setIsSniping(false);
        console.log("endbuy");
        newNonce();
    }

    async function newNonce() {
        const majNonce = await Promise.allSettled(
            dataAccounts.map(async (dataAccounts) => {
                const newData = await addNonce(dataAccounts.methods, dataAccounts.data);
                return { ...dataAccounts, data: newData };
            })
        );

        const successfulUpdates = majNonce
            .filter((result) => result.status === "fulfilled")
            .map((result) => (result as PromiseFulfilledResult<IDataAccount>).value);
        setDataAccount(successfulUpdates);
    }

    async function test() {
        if (dataERC20?.address) {
            setIsSniping(true);
            await buyWithEth(dataAccounts, dataERC20?.address, endBuy);

            // await scanMempool(myTransactions, dataERC20?.address, buyWithEth, endBuy);
        }
    }

    async function afterBuy() {}

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
                    {dataAccounts.length > 0 && (
                        <>
                            {boolTransactions && <GeneratorTransaction />}
                            {!boolTransactions && (
                                <button onClick={() => setBoolTransactions(true)}>Show Transactions</button>
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
