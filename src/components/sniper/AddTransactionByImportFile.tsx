export default function AddTransactionByImportFile() {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();

        // reader.onload = (event) => {
        //     setParams(event.target!.result as unknown as ParamsTransaction[]);
        // };

        reader.readAsText(file);
    };

    return (
        <>
            <button>Clic</button>;
            <input type="file" onChange={handleFileChange} />
        </>
    );
}
