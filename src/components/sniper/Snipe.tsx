import { ParamsSniper } from "@/library/interfaces";
import { useState } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper } from "@/redux/actions";
import { networks } from "@/library/constantes";

export default function Snipe({ sniper }: { sniper: ParamsSniper }) {
    const [params, setParams] = useState<string[]>();
    const dispatch = useDispatch();

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setParams(event.target!.result as unknown as string[]);
        };

        reader.readAsText(file);
    };

    return (
        <div className="contain-close">
            <Close functionClose={disableSniper} />
            <div>
                <input type="file" onChange={handleFileChange} />
                <div>Blockchain: {networks[sniper.blockchain].name}</div>
                <div>Router: {sniper.router.name}</div>
            </div>
        </div>
    );
}
