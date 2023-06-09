import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditSell from "./EditSell";
import Gas from "./Gas";
import Spinner from "@/components/Spinner";

export default function TransactionSell() {
    const { myTransaction, myAccountERC20, setMyAccountERC20, myAccount } = useMyTransaction();
    const { dataERC20 } = useMyState();
    const [bool, setBool] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    async function sell() {
        setMyAccountERC20({ ...myAccountERC20, isSell: true });
        if (myAccountERC20 && myAccount && dataERC20?.decimals) {
            const amount = ethers.parseUnits((myAccountERC20.tokenBalance * 0.99999).toString(), dataERC20?.decimals);
            const receip = await swapTokensForETHOnce(myAccount, dataERC20?.address, amount);
            console.log("Fin de la transaction ");
            console.log(receip);
            console.log("3 secondes");

            setMyAccountERC20({ ...myAccountERC20, isSell: false });
        }
        addNonce(myAccount!);
    }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myTransaction.gasSell} />
            </div>
            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            <button onClick={sell}>Sell {myAccountERC20.isSell && <Spinner />} </button>
            {bool && <EditSell setBool={setBool} />}
        </div>
    );
}
