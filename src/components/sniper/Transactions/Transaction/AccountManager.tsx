import Close from "@/components/Close";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { ClassERC20 } from "@/library/class";
import { IDataAccount } from "@/library/interfaces";
import { useEffect } from "react";
import Account from "./Account";
import BalanceToken from "./BalanceERC20";
import EditTransaction from "./EditTransaction";
import ManagerGas from "./ManagerGas";
import ResultSell from "./ResultSell";
import Sell from "./Sell";
import ResultBuy from "./ResultBuy";

export default function AccountManager({ dataAccount }: { dataAccount: IDataAccount }) {
    const { setMySymbol, setMyAccount, setMyERC20, myAccount } = useMyTransaction();
    const { paramsSniper, isSniping, dataERC20, setDataAccount, dataAccounts } = useMyState();

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

    function deleteAccount() {
        if (!myAccount) return;
        const newArray = [...dataAccounts];
        const index = newArray.findIndex((account) => account.data.public === myAccount.data.public);
        newArray.splice(index, 1);
        setDataAccount(newArray);
    }

    function data() {
        console.log(myAccount);
        console.log(dataAccounts);
    }

    return (
        <div className="accounts">
            {!myAccount?.hasBuy && <Close functionClose={deleteAccount} data="Close this account" />}
            <BalanceToken />
            <Account />
            <ManagerGas />
            <EditTransaction />
            {dataERC20 && <Sell />}
            {/* {myAccount?.hasBuy && <ResultBuy />} */}
            {/* {myAccount?.hasSell && <ResultSell />} */}
            <button onClick={data}>Data</button>
        </div>
    );
}
