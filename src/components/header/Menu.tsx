import { myComposantSniper } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Menu() {
    const dispatch = useDispatch();

    function addComposantSnipe() {
        dispatch(myComposantSniper(508));
    }

    return (
        <>
            <button onClick={addComposantSnipe}>Clic</button>
        </>
    );
}
