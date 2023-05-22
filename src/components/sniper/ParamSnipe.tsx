import { networks, routers } from "@/library/constantes";
import { AppState, ParamsSniper } from "@/library/interfaces";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { myAddASniper, myComposantSniper } from "@/redux/actions";
import { useState } from "react";
import Close from "../Close";
import { isRouter } from "@/library/fonctions";

export default function ParamSnipe() {
    const dispatch = useDispatch();
    const id = useSelector((state: AppState) => state.composantSniper.length);
    const [params, setParams] = useState<ParamsSniper>({
        blockchain: {
            name: "",
            symbol: "",
            connection: "",
        },
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

    function addComposantSnipe() {
        dispatch(myComposantSniper(params));
        dispatch(myAddASniper(false));
    }

    return (
        <>
            <div className="overlay"></div>
            <div id="paramSnipe">
                <Close functionClose={() => dispatch(myAddASniper(false))} />
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
                    {Object.keys(networks).map((network) => (
                        <option key={network} value={network}>
                            {networks[network].name}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                {params.blockchain.connection !== "" &&
                    params.blockchain.connection !== "sepolia" && (
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
                                {Object.keys(routers).map((router) => (
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
        </>
    );
}
