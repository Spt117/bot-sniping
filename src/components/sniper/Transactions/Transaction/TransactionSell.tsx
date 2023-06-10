import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce } from "@/library/fonctions";
import { myOverlay } from "@/redux/actions";
import { swapTokensForETHOnce } from "@/sniper/uniswapV2";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditSell from "./EditSell";
import Gas from "./Gas";

export default function TransactionSell() {
    const { myAccountERC20, setMyAccountERC20, myAccount, setMyAccount, myERC20 } = useMyTransaction();
    const { dataERC20, isSniping } = useMyState();
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
            setMyAccountERC20({ ...myAccountERC20, isSell: false });
            const addNewNonce = await addNonce(myAccount.methods, myAccount.data);
            const newAccount = { ...myAccount };
            newAccount.data = addNewNonce;
            setMyAccount(newAccount);
            console.log(newAccount);
        }
        await getBalance();
    }

    useEffect(() => {
        getBalance();
    }, [myERC20, myAccount, isSniping, myAccountERC20.isSell]);

    async function getBalance() {
        if (myERC20 && myAccount) {
            const balance = await myERC20.getBalance();
            if (balance) {
                const newAccountERC20 = { ...myAccountERC20 };
                newAccountERC20.tokenBalance = balance;
                setMyAccountERC20(newAccountERC20);
            }
        }
    }

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myAccount.data.gasSell} />
            </div>
            <button className="button" onClick={activeEdit}>
                Edit
            </button>
            <button onClick={sell}>Sell {myAccountERC20.isSell && <Spinner />} </button>
            {bool && <EditSell setBool={setBool} />}
        </div>
    );
}
