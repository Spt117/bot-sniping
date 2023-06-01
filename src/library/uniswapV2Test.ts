import { ethers } from "ethers";
import ABI from "../web3/abis/IERC20.json";
import AbiUniswapV2Router from "../web3/abis/routerUniswapV2.json";
import { GetTransaction } from "./class";

export async function testEth(wallet: GetTransaction) {
    const provider = wallet.getProvider();
    const tokenAdress = "0xa7065ba15c7906282973896f6fec835b0c6c545b";
    const tokenContract = new ethers.Contract(tokenAdress, ABI, provider);
    const UniswapRouterV2Adress = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
    const UniswapRouterV2Contract = new ethers.Contract(
        UniswapRouterV2Adress,
        AbiUniswapV2Router,
        provider
    );

    const factory = await UniswapRouterV2Contract.factory();
    const weth = await UniswapRouterV2Contract.WETH();
    console.log("factory", factory);
    console.log("weth", weth);
    const test = await UniswapRouterV2Contract.sortTokens(
        "0xa7065ba15c7906282973896f6fec835b0c6c545b",
        "0xc778417e063141139fce010982780140aa0cd5ab"
    );
    console.log("test", test);
}
