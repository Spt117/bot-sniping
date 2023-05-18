import { networks, routers } from "@/library/constantes";
import { ParamsSniper } from "@/library/interfaces";
import { useDispatch } from "react-redux";
import React from "react";
import { myComposantSniper } from "@/redux/actions";
import { useState } from "react";

export default function ParamSnipe() {
    const dispatch = useDispatch();
    const [params, setParams] = useState<ParamsSniper>({
        blockchain: "",
        routerAdress: "",
    });

    function isRouter(router: string): boolean {
        return routers[router].networks.includes(params.blockchain);
    }

    function addComposantSnipe() {
        dispatch(myComposantSniper(params));
    }

    return (
        <>
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
            {params.blockchain !== "" && params.blockchain !== "sepolia" && (
                <>
                    <label htmlFor="RouterAdress">DEX </label>
                    <select
                        name="routerAdress"
                        id="routerAdress"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                routerAdress: e.target.value,
                            })
                        }
                    >
                        <option value="">--Please choose an exchange--</option>
                        {Object.keys(routers).map((router) => (
                            <React.Fragment key={router}>
                                {isRouter(router) && (
                                    <option
                                        key={router}
                                        value={routers[router].address}
                                    >
                                        {router}
                                    </option>
                                )}
                            </React.Fragment>
                        ))}
                    </select>
                </>
            )}
            {params.routerAdress && (
                <>
                    <br />
                    <button onClick={addComposantSnipe}>Valider</button>
                </>
            )}
        </>
    );
}
