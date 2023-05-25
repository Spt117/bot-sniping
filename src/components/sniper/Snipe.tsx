import { ParamsSniper, ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper, myOverlay } from "@/redux/actions";
import AddTransaction from "./AddTransaction";
import { getTokenBalance } from "@/library/sniper";
import { useMyState } from "@/context/Context";
import { GeneratorTransaction } from "./GeneratorTransaction";

export default function Snipe({ sniper }: { sniper: ParamsSniper }) {
    const dispatch = useDispatch();
    const [params, setParams] = useState<ParamsTransaction[]>([]);
    const { myState, setMyState, setMySymbol } = useMyState();

    useEffect(() => {
        setMySymbol(sniper.blockchain.symbol);
    }, [myState]);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    function activeParam() {
        setMyState(1);
        dispatch(myOverlay(true));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setParams(event.target!.result as unknown as ParamsTransaction[]);
        };

        reader.readAsText(file);
    };

    return (
        <div className="contain-snipe">
            <div className="contain-close">
                <Close functionClose={disableSniper} />
                {/* <input type="file" onChange={handleFileChange} /> */}
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>
                {myState === 1 && <AddTransaction setParams={setParams} />}

                {/* <button onClick={() => getTokenBalance(params[0], sniper)}>
                    Clic
                </button> */}
                <button className="button" onClick={activeParam}>
                    Add Transaction
                </button>
                <GeneratorTransaction params={params} setParams={setParams} />
            </div>
        </div>
    );
}
