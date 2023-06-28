import { Wallet } from "@/library/class";
import { AppState } from "@/library/interfaces";
import { myBalance } from "@/redux/actions";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewBlock() {
    const dispatch = useDispatch();
    const network = useSelector((state: AppState) => state.network);

    useEffect(() => {
        if (network.connection) listenNewBlock();
    }, [network]);

    function listenNewBlock() {
        const provider = new ethers.JsonRpcProvider(network.connection);
        const wallet = new Wallet(window.ethereum);
        provider.on("block", async () => {
            const balance = await wallet.getBalance();
            dispatch(myBalance(Number(balance)));
        });

        // Cleanup function to disconnect when unmounting
        return () => {
            provider.removeAllListeners("block");
        };
    }

    return null;
}
