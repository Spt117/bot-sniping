import Spinner from "@/components/Spinner";
import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { addNonce } from "@/library/fonctions";
import { ParamsTransaction } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditApproval from "./EditApproval";
import Gas from "./Gas";
import { accountERC20 } from "@/library/constantes";
import TokenBalance from "./TokenBalance";

export default function TransactionApproval() {
    const { myAccount, myERC20, setMyAccountERC20, myAccountERC20, setMyAccount } = useMyTransaction();
    const { isSniping } = useMyState();
    const [bool, setBool] = useState(false);
    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    async function approve() {
        setMyAccountERC20({ ...myAccountERC20, isApproval: true });
        if (myERC20 && myAccount) {
            await myERC20.approve(myAccount.methods.blockchain.router.address);
            await isApproval();
        }
        setMyAccountERC20({ ...myAccountERC20, isApproval: false });
    }

    async function isApproval() {
        const buttonApprove = document.getElementById(`button-approve-${myAccount?.data.public}`) as HTMLButtonElement;
        const buttonEdit = document.getElementById(`button-edit-${myAccount?.data.public}`) as HTMLButtonElement;
        if (myERC20 && myAccount) {
            const allowance = await myERC20.getAllowance(myAccount.methods.blockchain.router.address);
            if (allowance && allowance > 0) {
                buttonApprove.setAttribute("disabled", "true");
                buttonEdit.setAttribute("disabled", "true");
                const newAccount = { ...myAccount };
                newAccount.data.approved = true;
                setMyAccount(newAccount);
            }
        }
    }

    useEffect(() => {
        isApproval();
    }, [myERC20]);

    if (!myAccount) return null;
    return (
        <div className="accounts-containers">
            <div className="items-header">
                <Gas gas={myAccount.data.gasApprove} />
                <div className="items">
                    <button id={`button-approve-${myAccount?.data.public}`} onClick={approve}>
                        Approve {myAccountERC20.isApproval === true && <Spinner />}
                    </button>
                </div>
                <div className="items">
                    <div>Balance: {myAccountERC20.tokenBalance}</div>
                </div>
            </div>
            <button className="button" onClick={activeEdit} id={`button-edit-${myAccount?.data.public}`}>
                Edit
            </button>
            {bool && <EditApproval setBool={setBool} />}
            <TokenBalance />
        </div>
    );
}
