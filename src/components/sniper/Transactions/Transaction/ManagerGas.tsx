import { useMyState } from "@/context/ContextSniper";
import { useMyTransaction } from "@/context/ContextTransaction";
import { Gas } from "@/library/interfaces";
import { ethers } from "ethers";

export default function ManagerGas() {
    const { myAccount } = useMyTransaction();
    const { paramsSniper } = useMyState();

    function calculMaxGasFees(gas: Gas) {
        return Number(ethers.formatEther((gas.gasLimit * gas.maxFeePerGas).toString()));
    }

    if (myAccount)
        return (
            <div className="accounts-containers">
                <div className="items-header">
                    <div className="items">
                        <div>MaxGas To Buy</div>
                        <output>
                            {calculMaxGasFees(myAccount.data.gasBuy)} {paramsSniper.blockchain.symbol}
                        </output>
                    </div>
                </div>
                <div className="items-header">
                    <div className="items">
                        <div>MaxGas To Sell</div>
                        <output>
                            {calculMaxGasFees(myAccount.data.gasSell)} {paramsSniper.blockchain.symbol}
                        </output>
                    </div>
                </div>
                {!myAccount?.approved && (
                    <div className="items-header">
                        <div className="items">
                            <div>MaxGas To Approve</div>
                            <output>
                                {calculMaxGasFees(myAccount.data.gasApprove)} {paramsSniper.blockchain.symbol}
                            </output>
                        </div>
                    </div>
                )}
            </div>
        );
    else return null;
}
