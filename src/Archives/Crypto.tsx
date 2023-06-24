// import crypto from "crypto";
// import { useEffect, useState } from "react";

// export default function Crypto() {
//     const [objet, setObjet] = useState({ key: "", iv: "", message: "" });

//     const key = crypto.randomBytes(32);
//     const iv = crypto.randomBytes(16);
//     useEffect(() => {
//         setObjet({
//             ...objet,
//             key: key.toString("hex"),
//             iv: iv.toString("hex"),
//         });
//     }, []);

//     return (
//         <>
//             <h3>Cryptographie</h3>
//             <input
//                 type="text"
//                 onChange={(e) =>
//                     setObjet({ ...objet, message: e.target.value })
//                 }
//             />
//             <p>Clé : {objet.key}</p>
//             <p>IV : {objet.iv}</p>
//             <p>Message : {objet.message}</p>
//         </>
//     );
// }
