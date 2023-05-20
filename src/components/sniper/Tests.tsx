import { getTokenBalance } from "@/library/testWeb3";
import { useEffect, useState } from "react";

export default function Tests() {
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        getTokenBalance();
    }, [amount]);

    return (
        <>
            <h3>Tests</h3>
            <button>Go</button>
            <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </>
    );
}
