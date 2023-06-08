import AccountManager from "./Transaction/AccountManager";
import { MyTransactionProvider } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";

export default function GeneratorTransaction() {
    const { myTransactions, setBoolTransactions } = useMyState();
    return (
        <>
            <h4>Transactions</h4>
            {myTransactions.map((myTransaction, index) => (
                <MyTransactionProvider key={index}>
                    <AccountManager myTransaction={myTransaction} />
                </MyTransactionProvider>
            ))}
            <button onClick={() => setBoolTransactions(false)}>Hide transactions</button>
        </>
    );
}
