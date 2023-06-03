import { ethers } from "ethers";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";
import AbiUniswapV2Factory from "../web3/abis/uniswapV2Factory.json";
import { GetTransaction } from "./class";

const tokenAdress = "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080";
const wethAdress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const UniswapRouterV2Adress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniswapV2FactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

export async function testEth(myWallet: GetTransaction) {
    const wallet = myWallet.getWallet();
    const factoryContract = new ethers.Contract(uniswapV2FactoryAddress, AbiUniswapV2Factory.abi, wallet);

    findPaire();

    function findPaire() {
        const intervalId = setInterval(async () => {
            const pair = await factoryContract.getPair(tokenAdress, wethAdress);
            console.log("pair", pair);

            if (pair !== "0x0000000000000000000000000000000000000000") {
                // swapETHForTokens(0.0001, myWallet);
                console.log("Pair found:", pair);
                clearInterval(intervalId); // Stop the interval
            }
        }, 1000);
    }
}

export async function swapETHForTokens(amountIn: number, myWallet: ethers.Wallet) {
    const UniswapRouterV2Contract = new ethers.Contract(UniswapRouterV2Adress, AbiUniswapV2Router, myWallet);
    const address = myWallet.getAddress();

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
    console.log("Transaction : " + JSON.stringify(tx, null, 2));

    // Attendre la confirmation de la transaction
    const receipt = await tx.wait();
    console.log("Transaction confirmée dans le bloc " + receipt.blockNumber);
}
let provider: ethers.WebSocketProvider;
if (process.env.alchemyGoerliWebSocket) provider = new ethers.WebSocketProvider(process.env.alchemyGoerliWebSocket);

let pendingHandler: ethers.Listener | undefined;

export async function testMempool(myWallet: GetTransaction) {
    console.log("Start monitoring the mempool.");
    console.log(process.env.alchemyGoerliWebSocket);

    const iface = new ethers.Interface(AbiUniswapV2Router);
    pendingHandler = async (tx: string) => {
        const txInfo = await provider.getTransaction(tx);
        if (txInfo && txInfo.to === "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D") {
            console.log("UniswapV2 detected a new transaction in the mempool: " + JSON.stringify(txInfo, null, 2));
            const data = txInfo.data;
            const decodedTransaction = iface.parseTransaction({ data });
            const args = decodedTransaction?.args;
            let found = false;
            for (let key in args) {
                if (args[key] === "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080") {
                    found = true;
                    break;
                }
            }
            if (found) {
                console.log("Token found");
            } else console.log("Token not found");
        } else console.log("Transaction not found");
    };

    provider.on("pending", pendingHandler);
}

export function stopMempool() {
    if (pendingHandler) {
        provider.off("pending", pendingHandler);
        console.log("Stopped monitoring the mempool.");
    }
}
