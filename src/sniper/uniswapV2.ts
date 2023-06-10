import { Numeric, ethers } from "ethers";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";
import { IDataAccount } from "@/library/interfaces";

export async function buyWithEth(dataAccounts: IDataAccount[], tokenAdress: string, endBuy: Function) {
    const promises = dataAccounts.map((dataAccount) => swapEth(dataAccount, tokenAdress));
    const result = await Promise.allSettled(promises);
    endBuy(result);
}

async function swapEth(dataAccount: IDataAccount, tokenAdress: string) {
    const number = dataAccount.data.repeat;
    // const nonce = dataAccount.data.nonce;
    const nonce = await dataAccount.methods.getWallet()?.getNonce();
    if (nonce === undefined) return null;
    if (number === 1) {
        const txReceipt = await swapETHForTokensOnce(dataAccount, tokenAdress, nonce);
        return txReceipt;
    } else {
        const promises = [];
        for (let i = 0; i < number; i++) {
            promises.push(swapETHForTokensOnce(dataAccount, tokenAdress, nonce + i));
        }
        const txReceipt = await Promise.all(promises);
        return txReceipt;
    }
}

async function swapETHForTokensOnce(dataAccount: IDataAccount, tokenAdress: string, nonce: number) {
    try {
        const wallet = dataAccount.methods.getWallet();
        const UniswapRouterV2Contract = new ethers.Contract(
            dataAccount.methods.blockchain.router.address,
            AbiUniswapV2Router,
            wallet
        );

        // Vous devez convertir le montant d'ETH que vous voulez swapper en Wei
        const amountInWei = ethers.parseEther(dataAccount.data.amount.toString());
        // Définissez le montant minimum de tokens que vous êtes prêt à recevoir en retour
        // Dans cet exemple, nous acceptons n'importe quel montant de tokens
        const amountOutMin = 0;
        // Le chemin de swap est ETH -> tokenOut
        const path = [dataAccount.methods.blockchain.blockchain.wrappedAddress, tokenAdress]; // Remplacez par les adresses réelles
        // Le timestamp du deadline
        // Dans cet exemple, nous fixons le deadline à 1 heure dans le futur
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
        // Exécutez le swap
        const tx = await UniswapRouterV2Contract.swapExactETHForTokens(
            amountOutMin,
            path,
            dataAccount.data.public,
            deadline,
            {
                ...{
                    value: amountInWei,
                    nonce: nonce,
                    ...dataAccount.data.gasBuy,
                },
            }
        );
        console.log("Transaction hash: " + tx.hash);
        // console.log("Transaction : " + JSON.stringify(tx, null, 2));
        // Attendre la confirmation de la transaction
        const receipt = await tx.wait();
        console.log("Transaction confirmée dans le bloc " + receipt.blockNumber);
        return receipt;
    } catch (error) {
        console.log(error);
    }
}

export async function swapTokensForETHOnce(dataAccount: IDataAccount, tokenAdress: string, amount: bigint) {
    try {
        const wallet = dataAccount.methods.getWallet();
        const UniswapRouterV2Contract = new ethers.Contract(
            dataAccount.methods.blockchain.router.address,
            AbiUniswapV2Router,
            wallet
        );

        // Dans cet exemple, nous acceptons n'importe quel montant d'ETH
        const amountOutMin = 0;
        // Le chemin de swap est tokenIN -> ETH
        const path = [tokenAdress, dataAccount.methods.blockchain.blockchain.wrappedAddress]; // Remplacez par les adresses réelles
        // Le timestamp du deadline
        // Dans cet exemple, nous fixons le deadline à 1 heure dans le futur
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
        // Exécutez le swap
        const tx = await UniswapRouterV2Contract.swapExactTokensForETH(
            amount,
            amountOutMin,
            path,
            dataAccount.data.public,
            deadline
        );
        console.log("Transaction hash: " + tx.hash);
        // console.log("Transaction : " + JSON.stringify(tx, null, 2));
        // Attendre la confirmation de la transaction
        const receipt = await tx.wait();
        console.log("Transaction confirmée dans le bloc " + receipt.blockNumber);
        return receipt;
    } catch (error) {
        console.log(error);
    }
}
