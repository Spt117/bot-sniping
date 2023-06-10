import { useMyTransaction } from "@/context/ContextTransaction";
import Gas from "./Gas";

export default function TransactionSell() {
    const { myAccount } = useMyTransaction();

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myAccount.data.gasSell} />
            </div>
        </div>
    );
}
