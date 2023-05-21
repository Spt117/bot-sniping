export default function Close({
    functionClose,
}: {
    functionClose: () => void;
}) {
    return (
        <button className="close-button" onClick={functionClose}>
            X
        </button>
    );
}
