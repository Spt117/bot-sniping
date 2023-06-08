import { useEffect } from "react";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useMyState } from "@/context/ContextSniper";
import { ClassERC20, GetTransaction } from "@/library/class";
import TransactionBuy from "./TransactionBuy";
import Account from "./Account";
import TransactionApproval from "./TransactionApproval";

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
        </div>
    );
}
