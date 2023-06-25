import { IDataAccount, IERC20 } from "@/library/interfaces";
import { TransactionResponse, ethers } from "ethers";
import AbiUniswapV2Factory from "../web3/abis/uniswapV2Factory.json";
import AbiUniswapV2Router from "../web3/abis/uniswapV2Rrouter.json";

export async function buyWithEth(
    dataAccounts: IDataAccount[],
    tokenAdress: string,
    majDataAccount: Function,
    setDataAccount: Function
) {
    const promises = dataAccounts.map((dataAccount) =>
        swapEth(dataAccount, tokenAdress, dataAccounts, majDataAccount, setDataAccount)
    );
    await Promise.allSettled(promises);
}

async function swapEth(
    dataAccount: IDataAccount,
    tokenAdress: string,
    dataAccounts: IDataAccount[],
    majDataAccount: Function,
    setDataAccount: Function
) {
    const number = dataAccount.data.repeat;
    const nonce = await dataAccount.methods.getWallet()?.getNonce();
    if (nonce === undefined) return null;
    if (number === 1) {
        const txReceipt = await swapETHForTokensOnce(dataAccount, tokenAdress, nonce);
        majDataAccount(dataAccounts, dataAccount, setDataAccount, "hasBuy", [txReceipt]);
        return txReceipt;
    } else {
        const promises = [];
        for (let i = 0; i < number; i++) {
            promises.push(swapETHForTokensOnce(dataAccount, tokenAdress, nonce + i));
        }
        const txReceipt = await Promise.all(promises);
        majDataAccount(dataAccounts, dataAccount, setDataAccount, "hasBuy", txReceipt);
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
        const tx: TransactionResponse = await UniswapRouterV2Contract.swapExactETHForTokens(
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
        console.log("Transaction confirmée dans le bloc " + receipt!.blockNumber);
        return receipt;
    } catch (error) {
        console.log(error);
    }
}

export async function sellWithEth(dataAccounts: IDataAccount[], dataERC20: IERC20, percent: number) {
    const promises = dataAccounts.map(async (dataAccount) => {
        if (!dataAccount.hasSell) {
            const balance = dataAccount.balance;
            const amount = balance * 0.99999 * (percent / 100);
            const amountBigInt = ethers.parseUnits(amount.toString(), dataERC20.decimals);
            await swapTokensForETHOnce(dataAccount, dataERC20.address, amountBigInt);
        }
    });
    const result = await Promise.allSettled(promises);
    return result;
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
        const tx: TransactionResponse = await UniswapRouterV2Contract.swapExactTokensForETH(
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
        console.log("Transaction confirmée dans le bloc " + receipt?.blockNumber);
        return receipt;
    } catch (error) {
        console.log(error);
    }
}

export async function getPaire(dataAccount: IDataAccount, tokenAdress: string) {
    const factoryContract = new ethers.Contract(
        dataAccount.methods.blockchain.router.factoryAddress,
        AbiUniswapV2Factory.abi,
        dataAccount.methods.getWallet()
    );

    const pair: string = await factoryContract.getPair(
        tokenAdress,
        dataAccount.methods.blockchain.blockchain.wrappedAddress
    );
    return pair;
}

export default async function calculAmountOut(dataAccount: IDataAccount, dataERC20: IERC20, amount: number) {
    // Remplacez par l'adresse de contrat de votre paire de tokens
    const pairAddress = await getPaire(dataAccount, dataERC20.address);

    // Créez une instance du contrat de la paire de tokens
    const pairAbi = [
        "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    ];
    const pairContract = new ethers.Contract(pairAddress, pairAbi, dataAccount.methods.getWallet());

    // Obtenez les réserves de la paire de tokens
    const reserves = await pairContract.getReserves();
    const inputReserve = reserves[0]; // Réserve de token
    const outputReserve = reserves[1]; // Réserve de WETH

    // Calculez le montant de sortie pour un swap de amount token vers WETH
    const inputAmount = ethers.parseUnits(amount.toString(), dataERC20.decimals);
    const inputAmountWithFee = inputAmount * BigInt(997);
    const numerator = inputAmountWithFee * BigInt(outputReserve);
    const denominator = inputReserve * BigInt(1000) + BigInt(inputAmountWithFee);
    const outputAmount = numerator / BigInt(denominator);
    return Number(ethers.formatEther(outputAmount));
}
