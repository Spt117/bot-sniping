import { AppState } from "@/library/interfaces";
import { myAddASniper } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Menu() {
    const dispatch = useDispatch();
    const bool = useSelector((state: AppState) => state.addASniper);

    function addComposantSnipe() {
        if (bool) dispatch(myAddASniper(false));
        else dispatch(myAddASniper(true));
    }

    return (
        <div className="containerHeader">
            <button id="newSnipe" onClick={addComposantSnipe}>
                Sniper
            </button>
        </div>
    );
}
