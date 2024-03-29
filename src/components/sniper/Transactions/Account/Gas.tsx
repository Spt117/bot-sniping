import { Gas } from "@/library/interfaces";

export default function Gas({ gas }: { gas: Gas }) {
    return (
        <>
            <div className="items">
                <div>Gas Limit</div>
                <output>{gas.gasLimit}</output>
            </div>
            <div className="items">
                <div>Max Fee Per Gas</div>
                <output>{gas.maxFeePerGas} Gwei</output>
            </div>
            <div className="items">
                <div>Max Priority Fee Per Gas</div>
                <output>{gas.maxPriorityFeePerGas} Gwei</output>
            </div>
        </>
    );
}
