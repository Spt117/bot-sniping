import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";

export default function TokenBalance() {
    const { myAccountERC20, setMyAccountERC20, myERC20, myAccount } = useMyTransaction();
    const { isSniping } = useMyState();

    useEffect(() => {
        getBalance();
    }, [myERC20, myAccount, isSniping, myAccountERC20.isSell]);

    async function getBalance() {
        if (myERC20 && myAccount) {
            const balance = await myERC20.getBalance();
            if (balance) setMyAccountERC20({ ...myAccountERC20, tokenBalance: balance });
        }
    }

    return null;
}
