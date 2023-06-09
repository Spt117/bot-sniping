import { ethers } from "ethers";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";
import { GetTransaction } from "../library/class";
import { addNonce } from "../library/fonctions";

export async function buyWithEth(transactions: GetTransaction[], tokenAdress: string, endBuy: Function) {
    const promises = transactions.map((transaction) => swapEth(transaction, tokenAdress));
    const result = await Promise.allSettled(promises);
    endBuy(result);

    const nonce = transactions.map((transaction) => addNonce(transaction));
    await Promise.allSettled(nonce);
}

async function swapEth(transaction: GetTransaction, tokenAdress: string) {
    const number = transaction.transaction.repeat;
    console.log("number : " + number);

    const nonce = transaction.transaction.nonce;
    if (number === 1) {
        const txReceipt = await swapETHForTokensOnce(transaction, tokenAdress, nonce);
        return txReceipt;
    } else {
        const promises = [];
        for (let i = 0; i < number; i++) {
            promises.push(swapETHForTokensOnce(transaction, tokenAdress, nonce + i));
        }
        const txReceipt = await Promise.all(promises);
        return txReceipt;
    }
}

async function swapETHForTokensOnce(myWallet: GetTransaction, tokenAdress: string, nonce: number) {
    try {
        const wallet = myWallet.getWallet();
        const UniswapRouterV2Contract = new ethers.Contract(
            myWallet.blockchain.router.address,
            AbiUniswapV2Router,
            wallet
        );

        // Vous devez convertir le montant d'ETH que vous voulez swapper en Wei
        const amountInWei = ethers.parseEther(myWallet.transaction.amount.toString());
        // Définissez le montant minimum de tokens que vous êtes prêt à recevoir en retour
        // Dans cet exemple, nous acceptons n'importe quel montant de tokens
        const amountOutMin = 0;
        // Le chemin de swap est ETH -> tokenOut
        const path = [myWallet.blockchain.blockchain.wrappedAddress, tokenAdress]; // Remplacez par les adresses réelles
        // Le timestamp du deadline
        // Dans cet exemple, nous fixons le deadline à 1 heure dans le futur
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
        // Exécutez le swap
        const tx = await UniswapRouterV2Contract.swapExactETHForTokens(
            amountOutMin,
            path,
            myWallet.transaction.public,
            deadline,
            {
                ...{
                    value: amountInWei,
                    nonce: nonce,
                    ...myWallet.transaction.gasBuy,
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

export async function swapTokensForETHOnce(myWallet: GetTransaction, tokenAdress: string, amount: bigint) {
    try {
        const wallet = myWallet.getWallet();
        const UniswapRouterV2Contract = new ethers.Contract(
            myWallet.blockchain.router.address,
            AbiUniswapV2Router,
            wallet
        );

        // Dans cet exemple, nous acceptons n'importe quel montant d'ETH
        const amountOutMin = 0;
        // Le chemin de swap est tokenIN -> ETH
        const path = [tokenAdress, myWallet.blockchain.blockchain.wrappedAddress]; // Remplacez par les adresses réelles
        // Le timestamp du deadline
        // Dans cet exemple, nous fixons le deadline à 1 heure dans le futur
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60;
        // Exécutez le swap
        const tx = await UniswapRouterV2Contract.swapExactTokensForETH(
            amount,
            amountOutMin,
            path,
            myWallet.transaction.public,
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
