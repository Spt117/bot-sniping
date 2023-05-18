import { useEffect } from "react";

export default function Snipe({ sniper }: { sniper: number }) {
    useEffect(() => {
        console.log(sniper);
    }, []);

    return (
        <>
            <div>{sniper}</div>
        </>
    );
}
