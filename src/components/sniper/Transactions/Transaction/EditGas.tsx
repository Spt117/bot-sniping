import { useMyTransaction } from "@/context/ContextTransaction";

export default function EditGas({ property }: { property: "gasBuy" | "gasApprove" | "gasSell" }) {
    const { myAccount, setMyAccount } = useMyTransaction();

    function setGas(prop: "gasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas", value: number) {
        if (myAccount) {
            let newAccount = { ...myAccount };
            newAccount.data[property][prop] = value;
            setMyAccount(newAccount);
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
            <p>{myAccount?.data[property].gasLimit}</p>
            <input
                type="number"
                name="maxFeePerGas"
                placeholder="MaxFeePerGas in Gwei"
                onChange={(e) => setGas("maxFeePerGas", Number(e.target.value))}
            />
            <p>{myAccount?.data[property].maxFeePerGas} Gwei</p>
            <input
                type="number"
                name="maxPriorityFeePerGas"
                placeholder="MaxPriorityFeePerGas in Gwei"
                onChange={(e) => setGas("maxPriorityFeePerGas", Number(e.target.value))}
            />
            <p>{myAccount?.data[property].maxPriorityFeePerGas} Gwei</p>
        </>
    );
}
