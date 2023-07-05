import { accounts } from "@/library/admin";
import { networks, paramSniper, routers } from "@/library/constantes";
import { AppState } from "@/library/interfaces";
import { myAddASniper, myComposantSniper, myOverlay } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Admin() {
    const dispatch = useDispatch();
    const id = useSelector((state: AppState) => state.composantSniper.length);
    const account = useSelector((state: AppState) => state.account);

    function close() {
        dispatch(myAddASniper(false));
        dispatch(myOverlay(false));
    }

    function admin() {
        let copyParams = { ...paramSniper };
        copyParams.blockchain = networks[4];
        copyParams.router = routers[1];
        copyParams.node = process.env.infuraGoerliWebSocket;
        copyParams.id = id;
        dispatch(myComposantSniper(copyParams));
        close();
    }

    if (account && accounts.includes(account)) return <button onClick={admin}>Admin</button>;
    else return null;
}
