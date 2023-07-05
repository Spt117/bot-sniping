import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect, useState } from "react";

export default function ButtonSell({ sell, amount }: { sell: (amount: number) => void; amount: number }) {
    const { myAccount, boolsTransaction } = useMyTransaction();
    const { isSniping } = useMyState();
    const [disabled, setDisabled] = useState<boolean>(false);

    function disabledButtons() {
        if (myAccount && (boolsTransaction.isSell || isSniping || myAccount.hasSell || myAccount.balance < 1)) {
            setDisabled(true);
        } else setDisabled(false);
    }

    useEffect(() => {
        disabledButtons();
    }, [boolsTransaction.isSell, myAccount?.hasSell, isSniping, myAccount?.balance]);

    return (
        <button disabled={disabled} className="button-sell" onClick={() => sell(amount)}>
            {amount}%
        </button>
    );
}
