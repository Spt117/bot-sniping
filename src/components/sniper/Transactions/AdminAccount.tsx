import { useMyState } from "@/context/ContextSniper";
import { ClassERC20, GetTransaction } from "@/library/class";
import { paramTransaction } from "@/library/constantes";
import { IDataAccount, IERC20, Keys } from "@/library/interfaces";
import { myOverlay } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminAccount() {
    const account = useSelector((state: any) => state.account);
    const { setMyState, setDataAccount, paramsSniper, dataAccounts, setDataERC20 } = useMyState();
    const dispatch = useDispatch();

    function close() {
        setMyState(0);
        dispatch(myOverlay(false));
    }
    async function addItem() {
        const account1: Keys = { public: "0x17CE990896154e4312a8970EF0Ef0d909A51296a", private: process.env.private1! };
        const dataAccount1: IDataAccount = {
            data: paramTransaction,
            methods: new GetTransaction(account1, paramsSniper),
            balance: 0,
            nonce: 0,
            approved: false,
            hasBuy: false,
            hasSell: false,
            resultBuy: [],
            resultSell: [],
            amountSpendETH: 0,
        };
        const account2: Keys = { public: "0x14Bdb366654600B81d13256b9dae08C109Fb1229", private: process.env.private2! };
        const dataAccount2: IDataAccount = {
            data: paramTransaction,
            methods: new GetTransaction(account2, paramsSniper),
            balance: 0,
            nonce: 0,
            approved: false,
            hasBuy: false,
            hasSell: false,
            resultBuy: [],
            resultSell: [],
            amountSpendETH: 0,
        };
        dataAccount2.data.public = account2.public;
        dataAccount2.data.private = account2.private;
        dataAccount1.data.public = account1.public;
        dataAccount1.data.private = account1.private;
        setDataAccount([dataAccount1, dataAccount2]);

        close();
    }

    if (account === "0x17CE990896154e4312a8970EF0Ef0d909A51296a") return <button onClick={addItem}>Admin</button>;
    else return null;
}
