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
        try {
            if (e === "chainChanged") {
                // window.location.reload();
                init();
            } else if (e === "accountsChanged") {
                getBalanceAndAddress();
            }
        } catch (e) {
            console.log(e);
            dispatch(myIsConnect(false));
        }
    }

    async function getBalanceAndAddress() {
        let wallet = new Wallet(window.ethereum);

        const [address, balance] = await Promise.all([
            wallet.getAddress(),
            wallet.getBalance(),
        ]);
        dispatch(myAccount(address));
        dispatch(myBalance(Number(balance)));
    }

    async function getNetwork() {
        let wallet = new Wallet(window.ethereum);

        const network = await wallet.getChain();
        const networkInfo = findNetworkByNameOrId(network.id);
        dispatch(myNetwork(networkInfo));
    }

    useEffect(() => {
        let wallet = new Wallet(window.ethereum);

        if (wallet.wallet) {
            init();
        } else {
            dispatch(myIsConnect(false));
        }
    }, [boolIsConnect]);

    async function init() {
        let wallet = new Wallet(window.ethereum);

        const isConnect = await wallet.isConnect();
        if (isConnect) {
            getBalanceAndAddress();
            getNetwork();
            // const network = await wallet.getChain();
            // const networkInfo = findNetworkByNameOrId(network.id);
            // dispatch(myNetwork(networkInfo));
            dispatch(myIsConnect(true));
            eventMetamask(events);
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
