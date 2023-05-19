import { ObjetSniper } from "@/library/interfaces";
import { useEffect, useState } from "react";

export default function Snipe({ sniper }: { sniper: ObjetSniper }) {
    const [params, setParams] = useState<string[]>();
    useEffect(() => {
        console.log(params);
    }, [params]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setParams(event.target!.result as unknown as string[]);
        };

        reader.readAsText(file);
    };

    return (
        <>
            <input type="file" onChange={handleFileChange} />

            <div>{sniper.routerAdress}</div>
        </>
    );
}
