import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { ClassERC20 } from "@/library/class";
import { useEffect } from "react";
import Account from "./Account";
import TransactionApproval from "./TransactionApproval";
import TransactionBuy from "./TransactionBuy";
import TransactionSell from "./TransactionSell";
import { IDataAccount } from "@/library/interfaces";

export default function AccountManager({ dataAccount }: { dataAccount: IDataAccount }) {
    const { setMySymbol, setMyAccount, setMyERC20, myAccount } = useMyTransaction();
    const { paramsSniper, isSniping, dataERC20, dataAccounts } = useMyState();

    useEffect(() => {
        if (!dataAccount.data.amountIsToken) setMySymbol(paramsSniper.blockchain.symbol);
        else {
            setMySymbol("tokens");
        }
        setMyAccount(dataAccount);
        if (dataERC20) {
            setMyERC20(new ClassERC20(dataERC20.address, dataAccount.methods, dataAccount.data));
        }
    }, [isSniping, dataAccount, dataERC20]);

    function test() {
        console.log(myAccount?.data);
        console.log(dataAccounts);
    }

    return (
        <div className="accounts">
            <Account />
            <TransactionBuy />
            <TransactionApproval />
            <TransactionSell />
            <button onClick={test}>Click</button>
        </div>
    );
}
