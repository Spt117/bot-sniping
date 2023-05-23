import { getTokenBalance, stored } from "@/library/testWeb3";
import { useEffect, useState } from "react";

export default function Tests() {
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {}, [amount]);

    return (
        <>
            <h3>Tests</h3>
            <button onClick={() => stored(amount)}>Go</button>
            <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </>
    );
}
