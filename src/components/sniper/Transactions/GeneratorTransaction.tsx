import { Transaction } from "./Transaction";
import { MySymbolProvider } from "@/context/ContextTransaction";
import { useMyState } from "@/context/Context";

export default function GeneratorTransaction() {
    const { myTransactions, setBoolTransactions } = useMyState();
    return (
        <>
            <h4>Transactions</h4>
            {myTransactions.map((param, index) => (
                <MySymbolProvider key={index}>
                    <Transaction param={param} />
                </MySymbolProvider>
            ))}
            <button onClick={() => setBoolTransactions(false)}>
                Hide transactions
            </button>
        </>
    );
}
