import { eventMetamask, findNetworkByNameOrId } from "@/library/fonctions";
import { myAccount, myBalance, myIsConnect, myNetwork } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Connect from "./Connect";
import Menu from "./Menu";
import Network from "./Network";
import Balance from "./Balance";
import { AppState } from "@/library/interfaces";
import { Wallet } from "@/library/class";

export default function Header() {
    const dispatch = useDispatch();
    const boolIsConnect = useSelector((state: AppState) => state.isConnect);

    async function events(e: string) {
        let wallet = new Wallet(window.ethereum);
        try {
            if (e === "chainChanged") {
                // window.location.reload();
                init(wallet);
            } else if (e === "accountsChanged") {
                const isConnect = await wallet.isConnect();
                if (isConnect) {
                    getBalanceAndAddress(wallet);
                } else {
                    dispatch(myIsConnect(false));
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(myIsConnect(false));
        }
    }

    async function getBalanceAndAddress(wallet: Wallet) {
        const [address, balance] = await Promise.all([
            wallet.getAddress(),
            wallet.getBalance(),
        ]);
        if (address) dispatch(myAccount(address));
        dispatch(myBalance(Number(balance)));
    }

    async function getNetwork(wallet: Wallet) {
        const network = await wallet.getChain();
        const networkInfo = findNetworkByNameOrId(network.id);
        dispatch(myNetwork(networkInfo));
    }

    useEffect(() => {
        const unsubscribe = eventMetamask(events);
        let wallet = new Wallet(window.ethereum);
        if (wallet.wallet) {
            init(wallet);
            // Return cleanup function
            return () => {
                unsubscribe();
            };
        } else {
            dispatch(myIsConnect(false));
        }
    }, [boolIsConnect]);

    async function init(wallet: Wallet) {
        const isConnect = await wallet.isConnect();
        if (isConnect) {
            getBalanceAndAddress(wallet);
            getNetwork(wallet);
            dispatch(myIsConnect(true));
        }
    }

    return (
        <header>
            <Menu />
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
    );
}
