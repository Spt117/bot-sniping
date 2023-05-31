import { AppState } from "@/library/interfaces";
import { useSelector } from "react-redux";

export default function Balance() {
    const balance = useSelector((state: AppState) => state.balance);
    const network = useSelector((state: AppState) => state.network);

    return (
        <div className="account">
            <p className="center">{`${balance} ${network.symbol}`}</p>
        </div>
    );
}
