import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { useEffect } from "react";

export default function TokenBalance() {
    const { myAccountERC20, setMyAccountERC20, myERC20, myAccount } = useMyTransaction();

    return null;
}
