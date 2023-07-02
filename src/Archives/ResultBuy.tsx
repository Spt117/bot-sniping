// import { useMyState } from "@/context/ContextSniper";
// import { useMyTransaction } from "@/context/ContextTransaction";
// import { majDataAccount } from "@/library/fonctions";
// import { ITransactionResult } from "@/library/interfaces";
// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// import abiUniswapV2Pair from "../web3/abis/uniswapV2Pair.json";

// export default function ResultBuy() {
//     const { dataAccounts, dataERC20, setDataAccount, paramsSniper } = useMyState();
//     const { myAccount } = useMyTransaction();

//     useEffect(() => {
//         setAmountspentEth();
//     }, [myAccount?.resultBuy.length]);

//     function setAmountspentEth() {
//         let amountspentEth = 0;
//         if (!myAccount) return;
//         for (let i = 0; i < myAccount.resultBuy.length; i++) {
//             amountspentEth += myAccount.resultBuy[i].amountETH;
//         }
//         majDataAccount(dataAccounts, myAccount!, setDataAccount, undefined, undefined, amountspentEth);
//     }

//     return (
//         <div className="accounts-containers">
//             {myAccount?.resultBuy.map((transaction) => (
//                 <div className="items-header" key={transaction.hash}>
//                     {transaction.amountETH !== 0 && (
//                         <>
//                             <div className="items">
//                                 <div>Tokens win with sold</div>
//                                 <output>
//                                     {transaction.amountToken.toFixed(4)} {dataERC20?.symbol}
//                                 </output>
//                             </div>
//                             <div className="items">
//                                 <div>Spent</div>
//                                 <output>
//                                     {transaction.amountETH.toFixed(4)} {paramsSniper.blockchain.symbol}
//                                 </output>
//                             </div>
//                         </>
//                     )}
//                     <div className="items">
//                         <div>Check{transaction.amountETH === 0 && " failed "} Transaction</div>
//                         <output>
//                             <a
//                                 title="Check Transaction"
//                                 target="_blank"
//                                 href={`${myAccount?.methods.blockchain.blockchain.addressExplorer}tx/${transaction.hash}`}
//                             >
//                                 Explorer
//                             </a>
//                         </output>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
