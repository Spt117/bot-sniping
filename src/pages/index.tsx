import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Generator from "@/components/sniper/Generator";
import { useSelector } from "react-redux";
import ParamSnipe from "@/components/sniper/ParamSnipe";
import { AppState } from "@/library/interfaces";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const bool = useSelector((state: AppState) => state.addASniper);
    const overlay = useSelector((state: AppState) => state.overlay);

    return (
        <>
            {bool && <ParamSnipe />}
            <Header />
            <Generator />
            {overlay && <div className="overlay"></div>}
        </>
    );
}
