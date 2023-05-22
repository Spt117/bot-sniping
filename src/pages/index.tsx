import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Generator from "@/components/sniper/Generator";
import Tests from "@/components/sniper/Tests";
import { useSelector } from "react-redux";
import ParamSnipe from "@/components/sniper/ParamSnipe";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const bool = useSelector((state: any) => state.addASniper);
    return (
        <>
            {bool && <ParamSnipe />}
            <Header />
            <Generator />
            <Tests />
        </>
    );
}
