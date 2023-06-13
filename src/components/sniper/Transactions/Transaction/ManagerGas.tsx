import { useMyTransaction } from "@/context/ContextTransaction";
import Gas from "./Gas";

export default function ManagerGas() {
    const { myAccount } = useMyTransaction();

    if (myAccount)
        return (
            <>
                <div className="accounts-containers">
                    <div className="items-header">
                        <div className="items">Gas Buy</div>
                    </div>
                    <div className="items-header">
                        <Gas gas={myAccount.data.gasBuy} />
                    </div>
                </div>
                <div className="accounts-containers">
                    <div className="items-header">
                        <div className="items">Gas Approve</div>
                    </div>
                    <div className="items-header">
                        <Gas gas={myAccount.data.gasApprove} />
                    </div>
                </div>
                <div className="accounts-containers">
                    <div className="items-header">
                        <div className="items">Gas Sell</div>
                    </div>
                    <div className="items-header">
                        <Gas gas={myAccount.data.gasSell} />
                    </div>
                </div>
            </>
        );
    else return null;
}
