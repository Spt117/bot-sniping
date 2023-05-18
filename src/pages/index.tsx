import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Generator from "@/components/sniper/Generator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Header />
            <Generator />
        </>
    );
}
