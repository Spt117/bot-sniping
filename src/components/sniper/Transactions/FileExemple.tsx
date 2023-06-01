import Close from "@/components/Close";
import { useMyState } from "@/context/Context";
import { myModel } from "@/library/constantes";
import { useState } from "react";

export default function FileExemple() {
    const { setMyState } = useMyState();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(myModel);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div id="model">
            <Close
                functionClose={() => {
                    setMyState(1);
                }}
            />
            <button id="button-copy" onClick={handleCopyClick}>
                {isCopied ? "Copied !" : "Copy"}
            </button>
            <pre>
                <code style={{ color: "black", fontWeight: "bolder" }}>
                    {myModel}
                </code>
            </pre>
            <br />
            <p>
                You can copy and paste this code in a json/txt file. Set your
                public and private adress and import the file.
            </p>
        </div>
    );
}
