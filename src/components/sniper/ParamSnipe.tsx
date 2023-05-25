import { networks, paramSniper, routers } from "@/library/constantes";
import { AppState, IParamsSniper } from "@/library/interfaces";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { myAddASniper, myComposantSniper, myOverlay } from "@/redux/actions";
import { useState } from "react";
import Close from "../Close";
import { isRouter } from "@/library/fonctions";

export default function ParamSnipe() {
    const dispatch = useDispatch();
    const id = useSelector((state: AppState) => state.composantSniper.length);
    const [params, setParams] = useState<IParamsSniper>(paramSniper);

    useEffect(() => {
        setParams({ ...params, id: id });
    }, [id]);

    function reset() {
        dispatch(myAddASniper(false));
        dispatch(myOverlay(false));
    }

    function addComposantSnipe() {
        dispatch(myComposantSniper(params));
        reset();
    }

    return (
        <div id="paramSnipe">
            <Close functionClose={reset} />
            <h4>Blockchain</h4>
            <select
                name="Blockchain"
                id="Blockchain"
                onChange={(e) =>
                    setParams({
                        ...params,
                        blockchain: networks[e.target.value],
                    })
                }
            >
                <option value="">--Please choose a Blockchain--</option>
                {Object.keys(networks)
                    .sort()
                    .map((network) => (
                        <option key={network} value={network}>
                            {networks[network].name}
                        </option>
                    ))}
            </select>
            <br />
            <br />
            {params.blockchain.connection !== "" &&
                params.blockchain.name !== "Sepolia Testnet" && (
                    <>
                        <h4>Exchange</h4>
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
                            {!params.router.name && (
                                <option value="">
                                    --Please choose an exchange--
                                </option>
                            )}
                            {Object.keys(routers)
                                .sort()
                                .map((router) => (
                                    <React.Fragment key={router}>
                                        {isRouter(router, params) && (
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
            {params.router.name && (
                <>
                    <br />
                    <br />
                    <button onClick={addComposantSnipe}>Valider</button>
                </>
            )}
        </div>
    );
}
