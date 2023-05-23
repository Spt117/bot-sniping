import { ParamsSniper, ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper } from "@/redux/actions";
import AddTransaction from "./AddTransaction";
import { getTokenBalance } from "@/library/sniper";
import { useBooleanContext } from "@/components/Context";

export default function Snipe({ sniper }: { sniper: ParamsSniper }) {
    const dispatch = useDispatch();
    const [params, setParams] = useState<ParamsTransaction[]>([]);
    const { state, setState } = useBooleanContext();

    useEffect(() => {
        console.log(state);
        setState(true);
    }, [params]);

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
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
        <div className="contain-close">
            <Close functionClose={disableSniper} />
            <div>
                {/* <input type="file" onChange={handleFileChange} /> */}
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>
                <AddTransaction setParams={setParams} />
                <button onClick={() => getTokenBalance(params[0], sniper)}>
                    Clic
                </button>
            </div>
        </div>
    );
}
