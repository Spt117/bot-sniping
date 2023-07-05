import { useMyState } from "@/context/ContextSniper";
import { ClassERC20 } from "@/library/class";
import { IERC20 } from "@/library/interfaces";
import { useState } from "react";
import AdminContract from "./Transactions/Account/AdminContract";

export default function Contrat() {
    const { setDataERC20, dataAccounts } = useMyState();
    const [contract, setContract] = useState("");

    async function sendContract() {
        const erc20 = new ClassERC20(contract, dataAccounts[0].methods, dataAccounts[0].data);
        try {
            const [name, symbol, decimals, totalSupply] = await Promise.all([
                erc20.getName(),
                erc20.getSymbol(),
                erc20.getDecimals(),
                erc20.getTotalSupply(),
            ]);

            const dataERC20: IERC20 = {
                name,
                symbol,
                decimals,
                totalSupply,
                address: contract,
            };

            setDataERC20(dataERC20);
        } catch (error) {
            console.log(error);
        }
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
            <br /> {<AdminContract />}
        </>
    );
}
