import { FeeAmount, TICK_SPACINGS, computePoolAddress } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { GetTransaction } from "./class";
import ABI from "../abi/IERC20.json";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

async function fetchTokenData(address: string, wallet: GetTransaction) {
    const provider = new ethers.JsonRpcProvider(
        wallet.blockchainRouter.blockchain.connection
    );
    const tokenContract = new ethers.Contract(address, ABI, provider);
    const decimals = await tokenContract.decimals();
    const symbol = await tokenContract.symbol();
    const name = await tokenContract.name();
    const chainId = await wallet.getWallet()?.provider?.getNetwork();
    const tokenData = {
        chainId: Number(chainId?.chainId),
        address: address,
        decimals: Number(decimals),
        symbol: symbol,
        name: name,
    };
    return tokenData;
}

export async function getEth(
    addr: string,
    addr2: string,
    wallet: GetTransaction
) {
    const tokenData = await fetchTokenData(addr, wallet);
    const wethData = await fetchTokenData(addr2, wallet);

    const quoterContract = new ethers.Contract(
        wallet.blockchainRouter.router.quoterAddress,
        Quoter.abi,
        wallet.getWallet()
    );

    const readableAmount = ethers.parseUnits(
        wallet.transaction.amount.toString(),
        tokenData.decimals
    );

    const quotedAmountOut =
        await quoterContract.quoteExactInputSingle.staticCall(
            tokenData.address,
            wethData.address,
            FeeAmount.MEDIUM,
            readableAmount,
            0
        );

    const result = ethers.formatUnits(quotedAmountOut, tokenData.decimals);
    console.log(result);
}

export async function checkPool(
    addr: string,
    addr2: string,
    wallet: GetTransaction
) {
    const tokenData = await fetchTokenData(addr, wallet);
    const wethData = await fetchTokenData(addr2, wallet);
    const fees = Object.keys(TICK_SPACINGS);

    for (let i = 0; i < fees.length; i++) {
        const currentPoolAddress = computePoolAddress({
            factoryAddress: wallet.blockchainRouter.router.factoryAddress,
            tokenA: new Token(
                tokenData.chainId,
                tokenData.address,
                tokenData.decimals,
                tokenData.symbol,
                tokenData.name
            ),
            tokenB: new Token(
                wethData.chainId,
                wethData.address,
                wethData.decimals,
                wethData.symbol,
                wethData.name
            ),
            fee: fees[i] as unknown as FeeAmount,
            // fee: FeeAmount.MEDIUM,
        });

        const code = await wallet
            .getWallet()
            ?.provider?.getCode(currentPoolAddress);
        if (code && code !== "0x") {
            console.log("adresse: ", currentPoolAddress, "fees: ", fees[i]);
        }
    }

    // const poolContract = new ethers.Contract(
    //     currentPoolAddress,
    //     IUniswapV3PoolABI.abi,
    //     wallet.getWallet()
    // );

    // const [token0, token1, fee] = await Promise.all([
    //     poolContract.token0(),
    //     poolContract.token1(),
    //     poolContract.fee(),
    // ]);
}
