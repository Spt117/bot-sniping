import { networks } from "@/library/constantes";
import { AppState } from "@/library/interfaces";
import { useSelector } from "react-redux";

export default function Balance() {
    const balance = useSelector((state: AppState) => state.balance);
    const network = useSelector((state: AppState) => state.chain);
    const networkName = network.name;

    return (
        <div className="account">
            {networks[networkName] && (
                <p className="center">{`${balance} ${networks[networkName].symbol}`}</p>
            )}
        </div>
    );
}
