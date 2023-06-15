import { MyStateProvider } from "@/context/ContextSniper";
import { AppState, IParamsSniper } from "@/library/interfaces";
import React from "react";
import { useSelector } from "react-redux";
import Snipe from "./Snipe";

export default function Generator() {
    const snipe = useSelector((state: AppState) => state.composantSniper);

    return (
        <>
            <div id="container-snipers">
                {snipe.map((sniper: IParamsSniper, index: number) => (
                    <React.Fragment key={index}>
                        {!sniper.disable && (
                            <MyStateProvider>
                                <Snipe sniper={sniper} />
                            </MyStateProvider>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
