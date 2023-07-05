import { myOverlay } from "@/redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Edit from "./Edit";

export default function EditTransaction() {
    const [bool, setBool] = useState(false);

    const dispatch = useDispatch();

    function activeEdit() {
        setBool(true);
        dispatch(myOverlay(true));
    }

    return (
        <>
            {bool && <Edit setBool={setBool} />}
            <button onClick={activeEdit}>Edit</button>
        </>
    );
}
