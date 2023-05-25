import { routers } from "./constantes";
import { IParamsSniper, ParamsTransaction } from "./interfaces";

export async function getData() {
    const response = await fetch("api/data");
    const data = await response.json();
}

//  formater l'adresse de connexion à afficher
export function truncateAddr(addr: string) {
    const truncate = /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = addr.match(truncate);
    if (!match) return addr;
    return `${match[1]}…${match[2]}`;
}

export function eventMetamask(callBack: any) {
    const events = ["chainChanged", "accountsChanged", "connect", "disconnect"];
    events.forEach((e) =>
        window.ethereum.on(e, () => {
            callBack(e);
        })
    );
    return () =>
        events.forEach((e) => window.ethereum.removeListener(e, callBack(e)));
}

export function isRouter(router: string, params: IParamsSniper): boolean {
    return routers[router].networks.includes(params.blockchain.name);
}

export function isEthereumAddress(
    address: ParamsTransaction,
    array: ParamsTransaction[]
) {
    const findAdress = checkIfAdressPublicIsInArray(array, address);
    const button = document.getElementById("newTransactionButton");
    const ethereumPublicAddressRegex = /^(0x){1}[0-9a-fA-F]{40}$/i;
    const ethereumPrivateAddressRegex = /^(0x){1}[0-9a-fA-F]{64}$/i;
    if (
        ethereumPublicAddressRegex.test(address.public) &&
        ethereumPrivateAddressRegex.test(address.private) &&
        !findAdress
    ) {
        button?.removeAttribute("disabled");
    } else {
        button?.setAttribute("disabled", "true");
    }
}

function checkIfAdressPublicIsInArray(
    array: ParamsTransaction[],
    transaction: ParamsTransaction
) {
    return array.find((e) => e.public === transaction.public) ? true : false;
}
