import { ParamsSniper } from "@/library/interfaces";
import { useEffect, useState } from "react";

export default function ParamSnipe() {
    const [params, setParams] = useState<ParamsSniper>({
        blockchain: "",
        routerAdress: "",
    });
    useEffect(() => {
        console.log(params);
    }, [params]);

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
                <option value="">--Please choose an Blockchain--</option>
                <option value="goerli">Testnet Goerli</option>
                <option value="mainnet">Ethereum</option>
                <option value="bnb">Binance Smart Chain</option>
                <option value="matic">Polygon</option>
            </select>
        </>
    );
}
