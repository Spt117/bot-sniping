import { ethers } from "ethers";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";
import { GetTransaction } from "./class";
import { addNonce } from "./fonctions";

export async function buy(transactions: GetTransaction[], tokenAdress: string) {
    let promises = transactions.map((transaction) => swaps(transaction, tokenAdress));
    await Promise.allSettled(promises);
    let nonces = transactions.map((transaction) => addNonce(transaction));
    await Promise.allSettled(nonces);
}

async function swaps(transaction: GetTransaction, tokenAdress: string) {
    const number = transaction.transaction.repeat;
    const nonce = transaction.transaction.nonce;
    if (number === 1) swapETHForTokensOnce(transaction, tokenAdress, nonce);
    else {
        let promises = [];
        for (let i = 0; i < number; i++) {
            promises.push(swapETHForTokensOnce(transaction, tokenAdress, nonce + i));
        }
        let resultats = await Promise.all(promises);
        console.log(resultats);
    }
}

async function swapETHForTokensOnce(myWallet: GetTransaction, tokenAdress: string, nonce: number) {
    try {
        const wallet = myWallet.getWallet();
        const UniswapRouterV2Contract = new ethers.Contract(
            myWallet.blockchainRouter.router.address,
            AbiUniswapV2Router,
            wallet
        );

        // Vous devez convertir le montant d'ETH que vous voulez swapper en Wei
        const amountInWei = ethers.parseEther(myWallet.transaction.amount.toString());
        // Définissez le montant minimum de tokens que vous êtes prêt à recevoir en retour
        // Dans cet exemple, nous acceptons n'importe quel montant de tokens
        const amountOutMin = 0;
        // Le chemin de swap est ETH -> tokenOut
        const path = [myWallet.blockchainRouter.blockchain.wrappedAddress, tokenAdress]; // Remplacez par les adresses réelles
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
                },
                ...myWallet.transaction.gas,
                ...{ nonce: nonce },
            }
        );
        console.log("Transaction hash: " + tx.hash);
        // console.log("Transaction : " + JSON.stringify(tx, null, 2));
        // Attendre la confirmation de la transaction
        const receipt = await tx.wait();
        console.log("Transaction confirmée dans le bloc " + receipt.blockNumber);
    } catch (error) {
        console.log(error);
    }
}

async function swapETHForTokensMultiple(myWallet: GetTransaction, tokenAdress: string) {}
