import AccountManager from "./Transaction/AccountManager";
import { MyTransactionProvider } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";

export default function GeneratorTransaction() {
    const { dataAccounts, setBoolTransactions } = useMyState();
    return (
        <>
            {dataAccounts.map((dataAccount, index) => (
                <MyTransactionProvider key={index}>
                    <AccountManager dataAccount={dataAccount} />
                </MyTransactionProvider>
            ))}
            <br />
            <button onClick={() => setBoolTransactions(false)}>{`Hide transaction${
                dataAccounts.length > 1 ? "s" : ""
            }`}</button>
        </>
    );
}
