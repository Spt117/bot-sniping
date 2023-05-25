import { ParamsTransaction } from "@/library/interfaces";
import { Transaction } from "./Transaction";
import { MySymbolProvider } from "@/context/ContextTransaction";

export function GeneratorTransaction({
    params,
    setParams,
}: {
    params: ParamsTransaction[];
    setParams: Function;
}) {
    return (
        <>
            {params.length > 0 && <h4>Transactions</h4>}
            {params.map((param, index) => (
                <MySymbolProvider key={index}>
                    <Transaction
                        setParams={setParams}
                        params={params}
                        param={param}
                    />
                </MySymbolProvider>
            ))}
        </>
    );
}
