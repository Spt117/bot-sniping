import { myAddASniper, myOverlay } from "@/redux/actions";
import { useDispatch } from "react-redux";

export default function Menu() {
    const dispatch = useDispatch();

    function addComposantSnipe() {
        dispatch(myAddASniper(true));
        dispatch(myOverlay(true));
    }

    return (
        <div className="containerHeader">
            <button id="newSnipe" onClick={addComposantSnipe}>
                Sniper
            </button>
        </div>
    );
}
