import { useEffect, useState } from "react";
import { request } from "../library/class";
import { getData } from "@/library/fonctions";
import { useSelector } from "react-redux";
import { AppState } from "@/library/interfaces";

export default function SetData() {
    const address = useSelector((state: AppState) => state.account);
    const [newData, setNewData] = useState({
        address: "",
        data: "",
    });

    async function sendData() {
        const dataTest = await fetch("api/data", new request(newData, "POST"));
        const res = await dataTest.json();
        console.log(res);
        getData();
    }
    return (
        <>
            <h3>Rentrer une donnée</h3>
            <input
                onChange={(e) =>
                    setNewData({ ...newData, data: e.target.value })
                }
            />
            <button onClick={sendData}>Envoyer</button>
            <p>Adresse : {address}</p>
        </>
    );
}
