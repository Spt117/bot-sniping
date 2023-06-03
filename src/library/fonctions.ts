import { networks, paramSniper, routers } from "./constantes";
import { IParamsSniper, IRouterDetails, ParamsTransaction } from "./interfaces";
import { hdkey } from "ethereumjs-wallet";
import { mnemonicToSeed } from "bip39";
import { toChecksumAddress } from "ethereumjs-util";
import { GetTransaction } from "./class";

export async function getData() {
    const response = await fetch("api/data");
    const data = await response.json();
}

//  formater l'adresse de connexion à afficher
export function truncateAddr(addr: string) {
    const truncate = /^(0x[a-fA-F0-9]{2})[a-fA-F0-9]+([a-fA-F0-9]{4})$/;
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
    return () => events.forEach((e) => window.ethereum.removeListener(e, callBack));
}

export function isRouter(router: IRouterDetails, params: IParamsSniper): boolean {
    return router.networks.includes(params.blockchain.name);
}

export function findNetworkByNameOrId(prop: string | number) {
    return networks.find((network) => network.name === prop || network.chainId === prop) || paramSniper.blockchain;
}

export function findRouterByName(name: string) {
    return routers.find((router) => router.name === name) || paramSniper.router;
}

export function isEthereumAddress(address: ParamsTransaction, array: GetTransaction[]) {
    const findAdressPublic = checkIfAdressPublicIsInArray(array, address);
    const button = document.getElementById("newTransactionButton");
    const ethereumPublicAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/i;
    const ethereumPrivateAddressRegex = /^(0x)?[0-9a-fA-F]{64}$/i;
    if (
        ethereumPublicAddressRegex.test(address.public) &&
        ethereumPrivateAddressRegex.test(address.private) &&
        !findAdressPublic
    ) {
        button?.removeAttribute("disabled");
    } else {
        button?.setAttribute("disabled", "true");
    }
}

function checkIfAdressPublicIsInArray(array: GetTransaction[], transaction: ParamsTransaction) {
    return array.find((e) => e.transaction.public === transaction.public) ? true : false;
}

export async function getAddresses(mnemonic: string, numAddresses: number) {
    const seed = await mnemonicToSeed(mnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";

    let paires = [];

    for (let i = 0; i < numAddresses; i++) {
        const wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
        const address = toChecksumAddress(wallet.getAddressString());
        const privateKey = wallet.getPrivateKeyString();
        paires.push({ public: address, private: privateKey });
    }
    return paires;
}

export async function addNonce(newItem: GetTransaction) {
    const nonce = await newItem.getWallet()?.getNonce();
    if (nonce) newItem.editTransaction({ ...newItem.transaction, nonce: nonce });
    return newItem;
}
