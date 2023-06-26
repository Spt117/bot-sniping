import { AppState } from "@/library/interfaces";
import { useSelector } from "react-redux";
import Balance from "./Balance";
import Connect from "./Connect";
import Init from "./Init";
import Menu from "./Menu";
import Network from "./Network";
import NewBlock from "./NewBlock";

export default function Header() {
    const boolIsConnect = useSelector((state: AppState) => state.isConnect);

    return (
        <header>
            <Init />
            <Menu />
            <div className="containerHeader">
                {boolIsConnect && (
                    <>
                        <Network />
                        <Balance />
                    </>
                )}
                <Connect />
                <NewBlock />
            </div>
        </header>
    );
}
