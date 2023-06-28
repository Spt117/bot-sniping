import { useMyState } from "@/context/ContextSniper";
import { truncateAddr } from "@/library/fonctions";

export default function ERC20() {
    const { dataERC20, paramsSniper } = useMyState();

    return (
        <div className="accounts-containers">
            <div className="items">
                <div>Token</div>
                {dataERC20?.address && (
                    <output>
                        <a
                            title="Check Token"
                            target="_blank"
                            href={`${paramsSniper.blockchain.addressExplorer}token/${dataERC20.address}`}
                        >
                            {truncateAddr(dataERC20.address)}
                        </a>
                    </output>
                )}
            </div>
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
