import { networks, paramSniper, routers } from "@/library/constantes";
import { findNetworkByNameOrId, findRouterByName, isRouter } from "@/library/fonctions";
import { AppState } from "@/library/interfaces";
import { myAddASniper, myComposantSniper, myOverlay } from "@/redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../Close";

export default function ParamSnipe() {
    const dispatch = useDispatch();
    const id = useSelector((state: AppState) => state.composantSniper.length);
    const [params, setParams] = useState(paramSniper);

    useEffect(() => {
        setParams({ ...params, id: id });
    }, [id]);

    function close() {
        dispatch(myAddASniper(false));
        dispatch(myOverlay(false));
    }

    function addComposantSnipe() {
        dispatch(myComposantSniper(params));
        close();
    }

    return (
        <div id="paramSnipe">
            <Close functionClose={close} />
            <h4>Blockchain</h4>
            <select
                name="Blockchain"
                id="Blockchain"
                onChange={(e) =>
                    setParams({
                        ...params,
                        blockchain: findNetworkByNameOrId(e.target.value),
                    })
                }
            >
                <option value="">--Please choose a Blockchain--</option>
                {networks
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((network) => (
                        <option key={network.chainId} value={network.name}>
                            {network.name}
                        </option>
                    ))}
            </select>
            <br />
            <br />
            {params.blockchain.connection !== "" && (
                <>
                    <h4>Exchange</h4>
                    <select
                        name="router"
                        id="router"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                router: findRouterByName(e.target.value),
                            })
                        }
                    >
                        {!params.router.name && <option value="">--Please choose an exchange--</option>}
                        {routers
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((router) => (
                                <React.Fragment key={router.name}>
                                    {isRouter(router, params) && <option value={router.name}>{router.name}</option>}
                                </React.Fragment>
                            ))}
                    </select>
                </>
            )}
            {params.router.name && (
                <>
                    <br />
                    <br />
                    <div>
                        <h4>Node (recommanded)</h4>
                        <input
                            type="text"
                            placeholder="Url of your node"
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    node: e.target.value,
                                })
                            }
                            id="node"
                        />
                    </div>
                    <br />
                    <button onClick={addComposantSnipe}>Valider</button>
                </>
            )}
        </div>
    );
}
