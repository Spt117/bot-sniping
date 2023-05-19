import { wallet } from "@/library/constantes";
import { eventMetamask } from "@/library/fonctions";
import { myAccount, myBalance, myChain, myIsConnect } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Connect from "./Connect";
import Menu from "./Menu";
import Network from "./Network";
import Balance from "./Balance";

export default function Header() {
    const dispatch = useDispatch();
    const boolIsConnect = useSelector((state: any) => state.isConnect);

    async function events(e: string) {
        try {
            const address = await wallet.getAddress();

            if (e === "chainChanged") {
                window.location.reload();
            } else if (e === "accountsChanged" && address !== undefined) {
                const balance = await wallet.getBalance();
                const amount = (Number(balance) / 10 ** 18).toFixed(2);
                dispatch(myAccount(address));
                dispatch(myBalance(Number(amount)));
            }
        } catch (e) {
            console.log(e);
            dispatch(myIsConnect(false));
        }
    }

    useEffect(() => {
        const init = async () => {
            const isConnect = await wallet.isConnect();
            if (isConnect) {
                const [address, network, balance] = await Promise.all([
                    wallet.getAddress(),
                    wallet.getChain(),
                    wallet.getBalance(),
                ]);
                const amount = (Number(balance) / 10 ** 18).toFixed(2);
                dispatch(myAccount(address));
                dispatch(myIsConnect(true));
                dispatch(myChain(network));
                dispatch(myBalance(Number(amount)));
                eventMetamask(events);
            }
        };

        if (wallet.wallet) {
            init();
        } else {
            dispatch(myIsConnect(false));
        }
    }, [boolIsConnect]);

    return (
        <>
            <header>
                {boolIsConnect && <Menu />}
                <div className="containerHeader">
                    {boolIsConnect && (
                        <>
                            <Network />
                            <Balance />
                        </>
                    )}
                    <Connect />
                </div>
            </header>
        </>
    );
}
