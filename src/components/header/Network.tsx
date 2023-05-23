import { useSelector } from "react-redux";
import Image from "next/image";
import { AppState, Network } from "@/library/interfaces";
import { networks } from "@/library/constantes";
import defaultImage from "@/assets/images/eth.png";

export default function Network() {
    const network = useSelector((state: AppState) => state.chain);
    const networkName = network.name;

    return (
        <div className="account">
            {networks[networkName] && (
                <>
                    <Image
                        src={networks[networkName].logo || defaultImage}
                        alt="eth"
                        className="imgHeader"
                    />
                    <p className="center">{networks[networkName].name}</p>
                </>
            )}
        </div>
    );
}
