import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { ClassERC20 } from "@/library/class";
import { useEffect } from "react";

export default function BalanceToken() {
    const { dataAccounts, dataERC20, setDataAccount, isSniping, isSelling } = useMyState();
    const { myAccount } = useMyTransaction();

    useEffect(() => {
        if (!isSniping && !isSelling) balanceERC20();
    }, [dataERC20, isSniping, isSelling, dataAccounts]);

    async function balanceERC20() {
        if (!myAccount || !dataERC20) return null;
        const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        const newArray = [...dataAccounts];
        const newERC20 = new ClassERC20(dataERC20.address, myAccount.methods, myAccount.data);
        const balance = await newERC20.getBalance();
        if (balance !== myAccount.balance) {
            newArray[index].balance = balance;
            setDataAccount(newArray);
        }
    }
    return null;
}
