import { useMyState } from "@/context/ContextSniper";
import { accounts } from "@/library/admin";
import { ClassERC20 } from "@/library/class";
import { AppState, IERC20 } from "@/library/interfaces";
import { useSelector } from "react-redux";

export default function AdminContract() {
    const { dataAccounts, setDataERC20 } = useMyState();
    const account = useSelector((state: AppState) => state.account);

    async function sendContract() {
        const erc20 = new ClassERC20(
            "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080",
            dataAccounts[0].methods,
            dataAccounts[0].data
        );
        let dataERC20: IERC20 = {
            name: "",
            symbol: "",
            decimals: 0,
            totalSupply: 0,
            address: "",
        };
        try {
            dataERC20.name = await erc20.getName();
            dataERC20.symbol = await erc20.getSymbol();
            dataERC20.decimals = await erc20.getDecimals();
            dataERC20.totalSupply = await erc20.getTotalSupply();
            dataERC20.address = "0x3138A27982b4567c36277aAbf7EEFdE10A6b8080";
        } catch (error) {
            console.log(error);
        }
        setDataERC20(dataERC20);
    }
    if (account && accounts.includes(account)) return <button onClick={sendContract}>Admin</button>;
    else return null;
}
