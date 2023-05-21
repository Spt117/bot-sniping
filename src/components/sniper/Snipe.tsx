import { ParamsSniper } from "@/library/interfaces";
import { useState } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper } from "@/redux/actions";

export default function Snipe({ sniper }: { sniper: ParamsSniper }) {
    const [params, setParams] = useState<string[]>();
    const dispatch = useDispatch();
    console.log(sniper);

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
        <div className="sniper">
            <div className="closed">
                <Close functionClose={disableSniper} />
                <input type="file" onChange={handleFileChange} />

                <div>Blockchain: {sniper.blockchain}</div>
                <div>Router: {sniper.router.name}</div>
            </div>
        </div>
    );
}
