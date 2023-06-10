import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { Listener } from "ethers";
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
        // eventTranferERC20();
    }

    let transferListener: Listener | null = null;

    function eventTranferERC20() {
        try {
            if (!myAccount || !myERC20) return null;
            const contract = myERC20.contract;

            // If there's an existing listener, remove it before adding a new one
            if (transferListener) {
                contract.off("Transfer", transferListener);
                transferListener = null;
            }

            // Define the listener
            transferListener = (from, to, amount) => {
                if (from === myAccount.data.public || to === myAccount.data.public) {
                    getBalance();
                    console.log(`Swap détecté ! 
                                 De: ${from} 
                                 À: ${to} 
                                 Montant: ${amount}`);
                }
            };

            // Attach the listener
            contract.on("Transfer", transferListener);
        } catch (e) {
            console.log(e);
        }
    }

    return null;
}
