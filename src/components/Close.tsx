export default function Close({ functionClose, data }: { functionClose: () => void; data?: string }) {
    return (
        <button className="close-button" {...(data ? { title: data } : { title: "Close" })} onClick={functionClose}>
            X
        </button>
    );
}
