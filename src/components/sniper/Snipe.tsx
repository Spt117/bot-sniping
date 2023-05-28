import { IParamsSniper } from "@/library/interfaces";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import { useMyState } from "@/context/Context";
import { GeneratorTransaction } from "./Transactions/GeneratorTransaction";
import { GetTransaction } from "@/library/class";
import { checkPool, getEth } from "@/library/uniswapTests";
import AddTransactionByMnemonic from "./Transactions/AddTransactionByMnemonic";
import AddTransactionManually from "./Transactions/AddTransactionManually";
import ChooseAddTransaction from "./Transactions/ChooseAddTransactions";
import FileExemple from "./Transactions/FileExemple";
import Close from "../Close";

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

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    function setComponent(number: number) {
        setMyState(number);
        dispatch(myOverlay(true));
    }

    async function test2(addr: string, addr2: string) {
        const wallet = new GetTransaction(myTransactions[0], sniper);
        getEth(addr, addr2, wallet);
        checkPool(addr, addr2, wallet);
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
                            <button onClick={() => setBoolTransactions(true)}>
                                Show Transactions
                            </button>
                        )}
                    </>
                )}
                <br />
                <br />

                <button
                    onClick={() =>
                        test2(
                            "0x395c6a5f1BFdF072163174e7F169B90D26bD0e93",
                            "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
                        )
                    }
                >
                    GetEth
                </button>
            </div>
        </div>
    );
}
