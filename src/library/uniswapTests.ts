import { FeeAmount, computePoolAddress } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { GetTransaction } from "./class";
import { networks } from "./constantes";
import ABI from "../abi/IERC20.json";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

// const tokens = {
//     in: "0x395c6a5f1BFdF072163174e7F169B90D26bD0e93",
//     amountIn: 1000,
//     out: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", // WETH
//     fee: FeeAmount.MEDIUM,
// };

// // const poolContract = new ethers.Contract(
// //     currentPoolAddress,
// //     IUniswapV3PoolABI.abi,
// //     getProvider()
// // );
async function fetchTokenData(address: string, wallet: GetTransaction) {
    const provider = new ethers.JsonRpcProvider(
        wallet.blockchainRouter.blockchain.connection
    );
    // const provider = wallet.getWallet();
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

export async function test(addr: string, wallet: GetTransaction) {
    const tokenData = await fetchTokenData(addr, wallet);
    const wethData = await fetchTokenData(
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        wallet
    );

    const currentPoolAddress = computePoolAddress({
        factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
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
        fee: FeeAmount.MEDIUM,
    });

    const code = await wallet
        .getWallet()
        ?.provider?.getCode(currentPoolAddress);
    console.log(code && code !== "0x");

    const poolContract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolABI.abi,
        wallet.getWallet()
    );

    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ]);

    console.log(token0, token1, fee);

    const quoterContract = new ethers.Contract(
        "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
        Quoter.abi,
        wallet.getWallet()
    );

    const quotedAmountOut =
        await quoterContract.quoteExactInputSingle.staticCall(
            token0,
            token1,
            fee,
            500000000000000,
            0
        );
    console.log(quotedAmountOut);
}
