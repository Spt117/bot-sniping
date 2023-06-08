import { useMyTransaction } from "@/context/ContextTransaction";

export default function EditGas({ property }: { property: "gasBuy" | "gasApprove" | "gasSell" }) {
    const { myTransaction, setMyTransaction } = useMyTransaction();

    function setGas(prop: "gasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas", value: number) {
        if (myTransaction) {
            let newTest = { ...myTransaction };
            newTest[property][prop] = value;
            setMyTransaction(newTest);
        }
    }

    return (
        <>
            <input
                type="number"
                name="gaslimit"
                placeholder="Gaslimit"
                onChange={(e) => setGas("gasLimit", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="maxFeePerGas"
                placeholder="MaxFeePerGas in Gwei"
                onChange={(e) => setGas("maxFeePerGas", Number(e.target.value))}
            />
            <br />
            <input
                type="number"
                name="maxPriorityFeePerGas"
                placeholder="MaxPriorityFeePerGas in Gwei"
                onChange={(e) => setGas("maxPriorityFeePerGas", Number(e.target.value))}
            />
        </>
    );
}
