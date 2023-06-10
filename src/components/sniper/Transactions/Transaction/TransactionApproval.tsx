import { useMyTransaction } from "@/context/ContextTransaction";
import Gas from "./Gas";
import TokenBalance from "./TokenBalance";

export default function TransactionApproval() {
    const { myAccount } = useMyTransaction();

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myAccount.data.gasApprove} />
            </div>
            <TokenBalance />
        </div>
    );
}
