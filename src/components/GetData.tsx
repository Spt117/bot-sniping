import { getData } from "@/library/fonctions";
import { useEffect } from "react";

export default function GetData() {
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h3>Récupérer donnée</h3>
        </>
    );
}
