import TransactionApproval from "./TransactionApproval";
import TransactionBuy from "./TransactionBuy";
import TransactionSell from "./TransactionSell";

export default function ManagerGas() {
    return (
        <>
            <TransactionBuy />
            <TransactionApproval />
            <TransactionSell />
        </>
    );
}
