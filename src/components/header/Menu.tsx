import { myAddASniper } from "@/redux/actions";
import { useDispatch } from "react-redux";

export default function Menu() {
    const dispatch = useDispatch();

    function addComposantSnipe() {
        dispatch(myAddASniper(true));
    }

    return (
        <>
            <button onClick={addComposantSnipe}>Sniper</button>
        </>
    );
}
