import { useMyState } from "@/context/ContextSniper";
import { ClassERC20 } from "@/library/class";
import { IERC20 } from "@/library/interfaces";
import { useState } from "react";

export default function Contrat() {
    const { setDataERC20, dataAccounts } = useMyState();
    const [contract, setContract] = useState("");

    async function sendContract() {
        const erc20 = new ClassERC20(contract, dataAccounts[0].methods, dataAccounts[0].data);
        let dataERC20: IERC20 = {
            name: "",
            symbol: "",
            decimals: 0,
            totalSupply: 0,
            address: "",
        };
        try {
            dataERC20.name = await erc20.getName();
            dataERC20.symbol = await erc20.getSymbol();
            dataERC20.decimals = await erc20.getDecimals();
            dataERC20.totalSupply = await erc20.getTotalSupply();
            dataERC20.address = contract;
        } catch (error) {
            console.log(error);
        }
        setDataERC20(dataERC20);
    }

    return (
        <>
            <br />
            <input
                id="address"
                type="text"
                placeholder="Contract Address"
                onChange={(e) => setContract(e.target.value)}
            />
            {contract && <button onClick={sendContract}>Confirm</button>}
        </>
    );
}
