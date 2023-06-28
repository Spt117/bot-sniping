import { networks, paramSniper, routers } from "./constantes";
import { IDataAccount, IERC20, IParamsSniper, IRouterDetails, ParamsTransaction } from "./interfaces";
import { hdkey } from "ethereumjs-wallet";
import { mnemonicToSeed } from "bip39";
import { toChecksumAddress } from "ethereumjs-util";
import { ClassERC20, GetTransaction } from "./class";
import { TransactionReceipt } from "ethers";

export async function getData() {
    const response = await fetch("api/data");
    const data = await response.json();
}

//  formater l'adresse de connexion à afficher
export function truncateAddr(addr: string | null | undefined) {
    if (addr) {
        const truncate = /^(0x[a-fA-F0-9]{2})[a-fA-F0-9]+([a-fA-F0-9]{4})$/;
        const match = addr.match(truncate);
        if (!match) return addr;
        return `${match[1]}…${match[2]}`;
    }
}

export function eventMetamask(callBack: Function) {
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

export function isEthereumAddress(address: ParamsTransaction, array: IDataAccount[]) {
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

function checkIfAdressPublicIsInArray(array: IDataAccount[], transaction: ParamsTransaction) {
    return array.find((e) => e.data.public === transaction.public) ? true : false;
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

export function majDataAccount(
    dataAccounts: IDataAccount[],
    account: IDataAccount,
    setter: Function,
    type?: "hasBuy" | "hasSell" | "approved",
    transaction?: TransactionReceipt[],
    amount?: number
) {
    const newDataAccounts = [...dataAccounts];
    const index = newDataAccounts.findIndex((e) => e.data.public === account.data.public);
    if (type) newDataAccounts[index][type] = true;
    if (type === "hasBuy" && transaction) {
        newDataAccounts[index].resultBuy = [...newDataAccounts[index].resultBuy, ...transaction];
    }
    if (type === "hasSell" && transaction) {
        newDataAccounts[index].resultSell = [...newDataAccounts[index].resultSell, ...transaction];
    }
    if (amount) newDataAccounts[index].amountSpendETH = amount;
    setter(newDataAccounts);
}
