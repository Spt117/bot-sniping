import { useSelector } from "react-redux";
import Snipe from "./Snipe";
import ParamSnipe from "./ParamSnipe";

export default function Generator() {
    const snipe = useSelector((state: any) => state.composantSniper);

    return (
        <>
            <ParamSnipe />
            {snipe.map((sniper: any, index: number) => (
                <Snipe key={index} sniper={sniper} />
            ))}
        </>
    );
}
