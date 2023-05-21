import { useSelector } from "react-redux";
import Snipe from "./Snipe";
import ParamSnipe from "./ParamSnipe";
import { ParamsSniper } from "@/library/interfaces";
import React from "react";

export default function Generator() {
    const snipe = useSelector((state: any) => state.composantSniper);
    const bool = useSelector((state: any) => state.addASniper);

    return (
        <>
            {bool && <ParamSnipe />}
            <div id="container-snipers">
                {snipe.map((sniper: ParamsSniper, index: number) => (
                    <React.Fragment key={index}>
                        {!sniper.disable && <Snipe sniper={sniper} />}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
