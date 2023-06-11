import { useMyState } from "@/context/ContextSniper";
import { getBalancesToken } from "@/library/fonctions";
import { useEffect } from "react";

export default function BalanceToken() {
    const { dataAccounts, dataERC20, setDataAccount } = useMyState();

    useEffect(() => {
        if (dataERC20) {
            getBalancesToken(dataAccounts, dataERC20, setDataAccount);
        }
    }, [dataERC20]);

    return null;
}
