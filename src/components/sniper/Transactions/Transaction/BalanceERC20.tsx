import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";

export default function BalanceToken() {
    const { dataAccounts, dataERC20, setDataAccount, isSniping, isSelling } = useMyState();
    const { myAccount, myERC20, boolsTransaction } = useMyTransaction();

    useEffect(() => {
        if (!isSniping && !isSelling) balanceERC20();
    }, [dataERC20, isSniping, isSelling, dataAccounts, boolsTransaction]);

    useEffect(() => {
        isApproval();
    }, [myERC20]);

    async function balanceERC20() {
        if (!myAccount || !dataERC20 || !myERC20) return null;
        const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
        const newArray = [...dataAccounts];
        const balance = await myERC20.getBalance();
        if (balance !== myAccount.balance) {
            newArray[index].balance = balance;
            setDataAccount(newArray);
        }
    }

    async function isApproval() {
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.methods.blockchain.router.address);
            if (allowance && allowance > 0) {
                const newArray = [...dataAccounts];
                myAccount.approved = true;
                const index = dataAccounts.findIndex((account) => account.data.public === myAccount.data.public);
                newArray[index] = myAccount;
                setDataAccount(newArray);
            }
        }
    }

    return null;
}
