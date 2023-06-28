import { useMyState } from "@/context/ContextSniper";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Infos() {
    const { paramsSniper } = useMyState();
    const [blockNumber, setBlockNumber] = useState<null | number>(null);

    useEffect(() => {
        let provider: ethers.JsonRpcProvider | null = null;
        if (paramsSniper.blockchain.connection) {
            provider = new ethers.JsonRpcProvider(paramsSniper.blockchain.connection);
            listenNewBlock(provider);
        }

        // Cleanup function
        return () => {
            provider?.removeAllListeners("block");
        };
    }, [paramsSniper.blockchain.connection]);

    async function listenNewBlock(provider: ethers.JsonRpcProvider) {
        try {
            const block = await provider.getBlockNumber();
            setBlockNumber(block);
            provider.on("block", async () => {
                const block = await provider.getBlockNumber();
                setBlockNumber(block);
            });
        } catch (error) {
            console.error("Failed to listen new block", error);
            // handle error as needed
        }
    }

    return (
        <>
            <div>{paramsSniper.blockchain.name}</div>
            <div>{paramsSniper.router.name}</div>
            {blockNumber && <div>Block {blockNumber}</div>}
        </>
    );
}
