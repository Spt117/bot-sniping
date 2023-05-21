// import { AppState } from "@/library/interfaces";
// import { myIsConnect } from "@/redux/actions";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Web3 from "web3";

// export default function CryptoMeta() {
//     const [message, setMessage] = useState({ message: "", crypté: "" });
//     const address = useSelector((state: AppState) => state.account);
//     const dispatch = useDispatch();

//     async function signer() {
//         const web3 = new Web3(window.ethereum);
//         const date = new Date();
//         const data = message.message + " : " + date;

//         try {
//             const signature = await window.ethereum.request({
//                 method: "personal_sign",
//                 params: [data, address],
//             });
//             const signer = await web3.eth.personal.ecRecover(data, signature);
//             if (signer.toLowerCase() === address!.toLowerCase()) {
//                 console.log("La signature est valide !");
//                 dispatch(myIsConnect(true));
//             } else {
//                 console.log("La signature est invalide.");
//                 dispatch(myIsConnect(false));
//             }
//         } catch (e) {
//             console.log(e);
//             dispatch(myIsConnect(false));
//         }
//     }

//     return (
//         <>
//             <h3>Meta Auth</h3>
//             <input
//                 type="text"
//                 onChange={(e) =>
//                     setMessage({ ...message, message: e.target.value })
//                 }
//             />
//             <button onClick={signer}>Crypter</button>
//         </>
//     );
// }
