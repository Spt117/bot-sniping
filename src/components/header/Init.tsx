import { Wallet } from "@/library/class";
import { eventMetamask, findNetworkByNameOrId } from "@/library/fonctions";
import { AppState } from "@/library/interfaces";
import { myAccount, myBalance, myIsConnect, myNetwork } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Init() {
    const dispatch = useDispatch();
    const boolIsConnect = useSelector((state: AppState) => state.isConnect);

    async function events(e: string, event: any) {
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
        const [address, balance] = await Promise.all([wallet.getAddress(), wallet.getBalance()]);
        if (address) dispatch(myAccount(address));
        dispatch(myBalance(Number(balance)));
    }

    async function getNetwork(wallet: Wallet) {
        const network = await wallet.getChain();
        const networkInfo = findNetworkByNameOrId(network.id);
        dispatch(myNetwork(networkInfo));
    }

    useEffect(() => {
        let wallet = new Wallet(window.ethereum);
        if (wallet.wallet) {
            const unsubscribe = eventMetamask(events);
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

    return null;
}
