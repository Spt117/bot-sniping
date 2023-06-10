import AccountManager from "./Transaction/AccountManager";
import { MyTransactionProvider } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";

export default function GeneratorTransaction() {
    const { dataAccounts, setBoolTransactions } = useMyState();
    return (
        <>
            <h4>Transactions</h4>
            {dataAccounts.map((dataAccount, index) => (
                <MyTransactionProvider key={index}>
                    <AccountManager dataAccount={dataAccount} />
                </MyTransactionProvider>
            ))}
            <br />
            <button onClick={() => setBoolTransactions(false)}>Hide transactions</button>
        </>
    );
}
