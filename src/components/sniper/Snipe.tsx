import { ObjetSniper } from "@/library/interfaces";
import { useEffect } from "react";

export default function Snipe({ sniper }: { sniper: ObjetSniper }) {
    useEffect(() => {
        console.log(sniper);
    }, []);

    return (
        <>
            <div>{sniper.routerAdress}</div>
        </>
    );
}
