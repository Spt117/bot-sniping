import { ParamsTransaction } from "@/library/interfaces";
import { Transaction } from "./Transaction";

export function GeneratorTransaction({
    params,
    setParams,
}: {
    params: ParamsTransaction[];
    setParams: Function;
}) {
    return (
        <>
            <h4>Transactions</h4>
            {params.map((param, index) => (
                <Transaction
                    key={index}
                    setParams={setParams}
                    params={params}
                    param={param}
                />
            ))}
        </>
    );
}
