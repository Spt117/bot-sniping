import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { ClassERC20, GetTransaction } from "@/library/class";
import { useEffect } from "react";
import Account from "./Account";
import TransactionApproval from "./TransactionApproval";
import TransactionBuy from "./TransactionBuy";
import TransactionSell from "./TransactionSell";

export default function AccountManager({ myTransaction }: { myTransaction: GetTransaction }) {
    const { setMySymbol, setMyTransaction, setMyAccount, setMyERC20 } = useMyTransaction();
    const { paramsSniper, isSniping, dataERC20 } = useMyState();

    useEffect(() => {
        if (!myTransaction.transaction.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        setMyTransaction(myTransaction.transaction);
        setMyAccount(myTransaction);
        if (dataERC20) {
            setMyERC20(new ClassERC20(dataERC20.address, myTransaction));
        }
    }, [isSniping, myTransaction, dataERC20]);

    return (
        <div className="accounts">
            <Account />
            <TransactionBuy />
            <TransactionApproval />
            <TransactionSell />
        </div>
    );
}
