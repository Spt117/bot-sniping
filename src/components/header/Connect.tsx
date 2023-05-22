import { wallet } from "@/library/constantes";
import { truncateAddr } from "@/library/fonctions";
import { myIsConnect } from "@/redux/actions";
import Image from "next/image";
import walletImage from "../../assets/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/library/interfaces";

export default function Connect() {
    const account = useSelector((state: AppState) => state.account);
    const bool = useSelector((state: AppState) => state.isConnect);
    const dispatch = useDispatch();

    // connecter metamask à l'aplication
    async function connectDapp() {
        try {
            await wallet.getSigner();
            dispatch(myIsConnect(true));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="account">
            <Image src={walletImage} alt="Wallet" className="imgHeader" />
            {!bool && <button onClick={connectDapp}>Connexion</button>}
            {account && bool && (
                <p className="center">{truncateAddr(account)}</p>
            )}
        </div>
    );
}
