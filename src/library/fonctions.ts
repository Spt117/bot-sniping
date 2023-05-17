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
