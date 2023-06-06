import { useMyState } from "@/context/ContextSniper";
import { useState } from "react";

export default function Contrat() {
    const { setContractAddress } = useMyState();
    const [contract, setContract] = useState("");

    function sendContract() {
        setContractAddress(contract);
    }

    return (
        <>
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
