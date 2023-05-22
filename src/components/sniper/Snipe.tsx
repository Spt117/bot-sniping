import { ParamsSniper, ParamsTransaction } from "@/library/interfaces";
import { useEffect, useState } from "react";
import Close from "../Close";
import { useDispatch } from "react-redux";
import { myDisableSniper } from "@/redux/actions";
import { ethers } from "ethers";
import ABI from "../../abi/testAbi.json";
import AddTransaction from "./AddTransaction";

export default function Snipe({ sniper }: { sniper: ParamsSniper }) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<ParamsTransaction[]>([]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    async function getTokenBalance() {
        const provider = new ethers.JsonRpcProvider(
            sniper.blockchain.connection
        );
        const contrat = "0x138c1366D3A60D3AECdA306A5caE077158839E9b";
        const wallet = new ethers.Wallet(process.env.privateKey!, provider);
        const contract = new ethers.Contract(contrat, ABI, wallet);
        const result = await contract.retrieve();
        console.log(Number(result));
    }

    function disableSniper() {
        dispatch(myDisableSniper(sniper));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setParams(event.target!.result as unknown as ParamsTransaction[]);
        };

        reader.readAsText(file);
    };

    return (
        <div className="contain-close">
            <Close functionClose={disableSniper} />
            <div>
                {/* <input type="file" onChange={handleFileChange} /> */}
                <div>{sniper.blockchain.name}</div>
                <div>{sniper.router.name}</div>
                <button onClick={getTokenBalance}>Clic</button>
                <AddTransaction setParams={setParams} params={params} />
            </div>
        </div>
    );
}
