import { ethers } from "ethers";
import ABI from "../web3/abis/IERC20.json";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";
import AbiUniswapV2Factory from "../web3/abis/uniswapV2Factory.json";
import { GetTransaction } from "./class";

export async function testEth(myWallet: GetTransaction) {
    const wallet = myWallet.getWallet();
    const address = myWallet.transaction.public;
    const tokenAdress = "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080";
    const wethAdress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
    const tokenContract = new ethers.Contract(tokenAdress, ABI, wallet);
    const UniswapRouterV2Adress = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
    const uniswapV2FactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    const UniswapRouterV2Contract = new ethers.Contract(UniswapRouterV2Adress, AbiUniswapV2Router, wallet);
    const factoryContract = new ethers.Contract(uniswapV2FactoryAddress, AbiUniswapV2Factory.abi, wallet);

    // const pair = await factoryContract.getPair(tokenAdress, wethAdress);
    // console.log("pair", pair);

    // swapETHForTokens(0.0001);

    async function swapETHForTokens(amountIn: number) {
        // Vous devez convertir le montant d'ETH que vous voulez swapper en Wei
        const amountInWei = ethers.parseEther(amountIn.toString());

        // Définissez le montant minimum de tokens que vous êtes prêt à recevoir en retour
        // Dans cet exemple, nous acceptons n'importe quel montant de tokens
        const amountOutMin = 0;

        // Le chemin de swap est ETH -> tokenOut
        const path = [wethAdress, tokenAdress]; // Remplacez par les adresses réelles

        // Le timestamp du deadline
        // Dans cet exemple, nous fixons le deadline à 1 heure dans le futur
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60;

        // Exécutez le swap
        const tx = await UniswapRouterV2Contract.swapExactETHForTokens(amountOutMin, path, address, deadline, {
            value: amountInWei,
        });

        console.log("Transaction hash: " + tx.hash);

        // Attendre la confirmation de la transaction
        const receipt = await tx.wait();
        console.log("Transaction confirmée dans le bloc " + receipt.blockNumber);
    }
    findPaire();

    async function findPaire() {
        const intervalId = setInterval(async () => {
            const pair = await factoryContract.getPair(tokenAdress, wethAdress);
            console.log("pair", pair);

            if (pair !== "0x0000000000000000000000000000000000000000") {
                // Remplacez par l'adresse null correcte
                swapETHForTokens(0.0001);
                console.log("Pair found:", pair);
                clearInterval(intervalId); // Stop the interval
            }
        }, 1000);
    }
}
