import { useSelector } from "react-redux";
import Snipe from "./Snipe";
import { AppState, ParamsSniper } from "@/library/interfaces";
import React from "react";
import { BooleanProvider } from "@/context/Context";

export default function Generator() {
    const snipe = useSelector((state: AppState) => state.composantSniper);

    return (
        <>
            <div id="container-snipers">
                {snipe.map((sniper: ParamsSniper, index: number) => (
                    <React.Fragment key={index}>
                        {!sniper.disable && (
                            <BooleanProvider>
                                <Snipe sniper={sniper} />
                            </BooleanProvider>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
