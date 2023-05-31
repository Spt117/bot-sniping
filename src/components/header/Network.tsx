import { useSelector } from "react-redux";
import Image from "next/image";
import { AppState } from "@/library/interfaces";
import defaultImage from "@/assets/ethereum.png";

export default function Network() {
    const networkInfos = useSelector((state: AppState) => state.network);

    return (
        <div className="account">
            <>
                <Image
                    src={networkInfos.logo || defaultImage}
                    alt="eth"
                    className="imgHeader"
                    priority={true}
                />
                <p className="center">{networkInfos.name}</p>
            </>
        </div>
    );
}
