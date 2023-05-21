import { networks, routers } from "@/library/constantes";
import { ParamsSniper } from "@/library/interfaces";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { myAddASniper, myComposantSniper } from "@/redux/actions";
import { useState } from "react";
import Close from "../Close";

export default function ParamSnipe() {
    const dispatch = useDispatch();
    const id = useSelector((state: any) => state.composantSniper.length);
    const [params, setParams] = useState<ParamsSniper>({
        blockchain: "",
        router: {
            name: "",
            address: "",
            networks: [],
        },
        id: 0,
        disable: false,
    });

    useEffect(() => {
        setParams({ ...params, id: id });
    }, [id]);

    function isRouter(router: string): boolean {
        return routers[router].networks.includes(params.blockchain);
    }

    function addComposantSnipe() {
        dispatch(myComposantSniper(params));
        dispatch(myAddASniper(false));
    }

    return (
        <div id="paramSnipe">
            <Close functionClose={() => dispatch(myAddASniper(false))} />
            <label htmlFor="Blockchain">Blockchain </label>
            <select
                name="Blockchain"
                id="Blockchain"
                onChange={(e) =>
                    setParams({ ...params, blockchain: e.target.value })
                }
            >
                <option value="">--Please choose a Blockchain--</option>
                {Object.keys(networks).map((network) => (
                    <option key={network} value={network}>
                        {networks[network].name}
                    </option>
                ))}
            </select>
            <br />
            <br />
            {params.blockchain !== "" && params.blockchain !== "sepolia" && (
                <>
                    <label htmlFor="Router">DEX </label>
                    <select
                        name="router"
                        id="router"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                router: routers[e.target.value],
                            })
                        }
                    >
                        <option value="">--Please choose an exchange--</option>
                        {Object.keys(routers).map((router) => (
                            <React.Fragment key={router}>
                                {isRouter(router) && (
                                    <option
                                        key={router}
                                        value={routers[router].name}
                                    >
                                        {router}
                                    </option>
                                )}
                            </React.Fragment>
                        ))}
                    </select>
                </>
            )}
            {params.router && (
                <>
                    <br />
                    <br />
                    <button onClick={addComposantSnipe}>Valider</button>
                </>
            )}
        </div>
    );
}
