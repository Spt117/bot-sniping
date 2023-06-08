import { useMyTransaction } from "@/context/ContextTransaction";
import { ClassERC20 } from "@/library/class";
import { useMyState } from "@/context/ContextSniper";
import { useEffect } from "react";

export default function ERC20() {
    const { myAccount, setMyERC20, myERC20 } = useMyTransaction();
    const { dataERC20 } = useMyState();

    useEffect(() => {
        setERC20();
    }, [dataERC20?.address]);

    async function setERC20() {
        if (dataERC20?.address && myAccount) {
            const erc20 = new ClassERC20(dataERC20?.address, myAccount);
            setMyERC20(erc20);
        }
    }

    return (
        <div className="accounts-containers">
            <div className="items">Token</div>
            <div className="items">
                <div>Name</div>
                {dataERC20?.address && <output>{dataERC20.name}</output>}
            </div>
            <div className="items">
                <div>Symbol</div>
                {dataERC20?.address && <output>{dataERC20.symbol}</output>}
            </div>
            <div className="items">
                <div>Decimals</div>
                {dataERC20?.address && <output>{dataERC20.decimals}</output>}
            </div>
            <div className="items">
                <div>Total Supply</div>
                {dataERC20?.address && <output>{dataERC20.totalSupply}</output>}
            </div>
        </div>
    );
}
