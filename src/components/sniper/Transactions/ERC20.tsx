import { useMyState } from "@/context/ContextSniper";

export default function ERC20() {
    const { dataERC20 } = useMyState();

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
