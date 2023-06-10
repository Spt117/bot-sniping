import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";

export default function TokenBalance() {
    const { myAccountERC20, setMyAccountERC20, myERC20, myAccount } = useMyTransaction();

    useEffect(() => {
        getBalance();
    }, [myERC20, myAccount]);

    async function getBalance() {
        if (myERC20 && myAccount) {
            const balance = await myERC20.getBalance();
            if (balance) {
                const newAccountERC20 = { ...myAccountERC20 };
                newAccountERC20.tokenBalance = balance;
                setMyAccountERC20(newAccountERC20);
            }
        }
        eventTranferERC20();
    }

    function eventTranferERC20() {
        try {
            const contract = myERC20?.contract;
            contract?.on("Transfer", (from, to, amount) => {
                if (from === myAccount?.data.public || to === myAccount?.data.public) {
                    getBalance();
                    console.log(`Swap détecté ! 
                                 De: ${from} 
                                 À: ${to} 
                                 Montant: ${amount}`);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    return null;
}
