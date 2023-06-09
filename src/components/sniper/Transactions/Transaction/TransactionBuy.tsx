import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { myOverlay } from "@/redux/actions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditBuy from "./EditBuy";
import Gas from "./Gas";
import { ethers } from "ethers";
import { addNonce } from "@/library/fonctions";

export default function TransactionBuy() {
    const { myTransaction, setMyTransaction, myAccountERC20, myAccount, setMyAccountERC20 } = useMyTransaction();
    const { dataERC20 } = useMyState();
    const dispatch = useDispatch();
    const [bool, setBool] = useState(false);

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    // function setTransaction(prop: "amount" | "slippagePercent" | "repeat", value: number) {
    //     setMyTransaction({ ...myTransaction, [prop]: value });
    // }

    if (!myTransaction) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myTransaction.gasBuy} />
                <div className="items">
                    <div>Slippage</div>
                    <output>{myTransaction.slippagePercent} %</output>
                </div>
            </div>
            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            {bool && <EditBuy setBool={setBool} transaction={myTransaction} setTransaction={setMyTransaction} />}
        </div>
    );
}
