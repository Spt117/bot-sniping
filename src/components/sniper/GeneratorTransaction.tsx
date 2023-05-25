import { Transaction } from "./Transaction";
import { MySymbolProvider } from "@/context/ContextTransaction";
import { useMyState } from "@/context/Context";

export function GeneratorTransaction() {
    const { myTransactions } = useMyState();
    return (
        <>
            {myTransactions.length > 0 && <h4>Transactions</h4>}
            {myTransactions.map((param, index) => (
                <MySymbolProvider key={index}>
                    <Transaction param={param} />
                </MySymbolProvider>
            ))}
        </>
    );
}
