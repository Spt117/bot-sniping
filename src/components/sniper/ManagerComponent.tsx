import { useMyState } from "@/context/ContextSniper";
import AddTransactionByMnemonic from "./Transactions/AddTransactionByMnemonic";
import AddTransactionManually from "./Transactions/AddTransactionManually";
import ChooseAddTransaction from "./Transactions/ChooseAddTransactions";
import FileExemple from "./Transactions/FileExemple";

export default function ManagerComponent() {
    const { myState } = useMyState();

    return (
        <>
            {myState === 1 && <ChooseAddTransaction />}
            {myState === 2 && <AddTransactionManually />}
            {myState === 3 && <FileExemple />}
            {myState === 4 && <AddTransactionByMnemonic />}
        </>
    );
}
